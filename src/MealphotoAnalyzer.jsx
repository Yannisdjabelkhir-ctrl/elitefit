import { useState } from 'react';

function MealPhotoAnalyzer({ onResult }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

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
    <div>
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handlePhoto}
        disabled={loading}
      />
      {loading && <p>Analyse en cours...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default MealPhotoAnalyzer;
