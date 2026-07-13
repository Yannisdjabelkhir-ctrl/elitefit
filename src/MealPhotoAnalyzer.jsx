import { useState } from 'react';
import { Camera, Loader2, Check, X } from 'lucide-react';

const GOLD = '#C9A84C';
const SURFACE = '#111111';
const BORDER = '#2A2A2A';
const TEXT = '#F0EDE6';
const MUTED = '#888880';

function MealPhotoAnalyzer({ onResult }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const [draft, setDraft] = useState(null); // résultat en attente de confirmation

  const handlePhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setLoading(true);
    setError(null);
    setDraft(null);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result.split(',')[1];
      try {
        const res = await fetch('/api/analyze-meal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64, mediaType: file.type })
        });
        const data = await res.json();
        if (data.error) {
          setError(data.error);
        } else {
          setDraft({
            nom: data.aliments?.join(', ') || 'Aliment inconnu',
            kcal: data.calories_estimees || 0,
            prot: data.proteines_g || 0,
            gluc: data.glucides_g || 0,
            lip: data.lipides_g || 0,
            confiance: data.confiance || 'moyenne',
          });
        }
      } catch (err) {
        console.error(err);
        setError('Erreur lors de l\'analyse');
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const updateDraft = (field, value) => {
    setDraft({ ...draft, [field]: value });
  };

  const confirmAdd = () => {
    onResult(draft);
    setDraft(null);
    setPreview(null);
  };

  const cancelAdd = () => {
    setDraft(null);
    setPreview(null);
  };

  const confidenceColor = draft?.confiance === 'haute' ? '#4ADE80' : draft?.confiance === 'basse' ? '#F05252' : GOLD;
  const confidenceLabel = draft?.confiance === 'haute' ? 'Estimation fiable' : draft?.confiance === 'basse' ? 'Estimation incertaine' : 'Estimation approximative';

  return (
    <div style={{ marginBottom: 16 }}>
      {!draft && (
        <label
          htmlFor="meal-photo-input"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            padding: '14px 20px',
            borderRadius: 12,
            border: `1px solid ${GOLD}55`,
            background: `linear-gradient(135deg, ${SURFACE} 0%, #0A0A0A 100%)`,
            color: GOLD,
            fontWeight: 600,
            fontSize: 15,
            cursor: loading ? 'default' : 'pointer',
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? (
            <>
              <Loader2 size={18} color={GOLD} style={{ animation: 'spin 1s linear infinite' }} />
              Analyse en cours...
            </>
          ) : (
            <>
              <Camera size={18} color={GOLD} />
              Analyser une photo de repas
            </>
          )}
          <input
            id="meal-photo-input"
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handlePhoto}
            disabled={loading}
            style={{ display: 'none' }}
          />
        </label>
      )}

      {preview && !loading && (
        <img
          src={preview}
          alt="Aperçu du repas"
          style={{
            marginTop: 10,
            width: '100%',
            maxHeight: 160,
            objectFit: 'cover',
            borderRadius: 10,
            border: `1px solid ${BORDER}`,
          }}
        />
      )}

      {error && <p style={{ color: '#F05252', fontSize: 13, marginTop: 8 }}>{error}</p>}

      {draft && (
        <div
          style={{
            marginTop: 12,
            padding: 16,
            borderRadius: 12,
            background: SURFACE,
            border: `1px solid ${BORDER}`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ color: TEXT, fontSize: 13, fontWeight: 700 }}>Vérifie avant d'ajouter</span>
            <span style={{ color: confidenceColor, fontSize: 11, fontWeight: 600 }}>{confidenceLabel}</span>
          </div>

          <label style={{ color: MUTED, fontSize: 12, display: 'block', marginBottom: 4 }}>Nom</label>
          <input
            value={draft.nom}
            onChange={(e) => updateDraft('nom', e.target.value)}
            style={{
              width: '100%', padding: '10px 12px', marginBottom: 10,
              borderRadius: 8, border: `1px solid ${BORDER}`, background: '#0A0A0A',
              color: TEXT, fontSize: 14, boxSizing: 'border-box',
            }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
            {[
              { key: 'kcal', label: 'Calories' },
              { key: 'prot', label: 'Protéines (g)' },
              { key: 'gluc', label: 'Glucides (g)' },
              { key: 'lip', label: 'Lipides (g)' },
            ].map(({ key, label }) => (
              <div key={key}>
                <label style={{ color: MUTED, fontSize: 12, display: 'block', marginBottom: 4 }}>{label}</label>
                <input
                  type="number"
                  value={draft[key]}
                  onChange={(e) => updateDraft(key, Number(e.target.value) || 0)}
                  style={{
                    width: '100%', padding: '10px 12px',
                    borderRadius: 8, border: `1px solid ${BORDER}`, background: '#0A0A0A',
                    color: TEXT, fontSize: 14, boxSizing: 'border-box',
                  }}
                />
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={confirmAdd}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: '12px', borderRadius: 8, border: 'none',
                background: GOLD, color: '#0A0A0A', fontWeight: 700, fontSize: 14, cursor: 'pointer',
              }}
            >
              <Check size={16} /> Ajouter au journal
            </button>
            <button
              onClick={cancelAdd}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                padding: '12px 16px', borderRadius: 8, border: `1px solid ${BORDER}`,
                background: 'transparent', color: MUTED, fontWeight: 600, fontSize: 14, cursor: 'pointer',
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default MealPhotoAnalyzer;
