import { useState } from 'react';
import { Camera, Loader2 } from 'lucide-react';

const GOLD = '#C9A84C';
const SURFACE = '#111111';
const BORDER = '#2A2A2A';
const TEXT = '#F0EDE6';
const MUTED = '#888880';

function MealPhotoAnalyzer({ onResult }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);

  const handlePhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setLoading(true);
    setError(null);

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
          onResult(data);
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

  return (
    <div style={{ marginBottom: 16 }}>
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
          transition: 'opacity 0.2s',
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

      {error && (
        <p style={{ color: '#F05252', fontSize: 13, marginTop: 8 }}>{error}</p>
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
