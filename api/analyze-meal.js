export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { image, mediaType } = req.body;

  if (!image) {
    return res.status(400).json({ error: 'Aucune image fournie' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: mediaType, data: image }
            },
            {
              type: 'text',
              text: `Analyse cette photo de repas et réponds UNIQUEMENT en JSON valide, sans texte avant ni après, sans balises markdown, avec cette structure exacte :
{
  "aliments": ["nom de chaque aliment identifié"],
  "calories_estimees": nombre,
  "proteines_g": nombre,
  "glucides_g": nombre,
  "lipides_g": nombre,
  "confiance": "haute" | "moyenne" | "basse"
}`
            }
          ]
        }]
      })
    });

    const data = await response.json();
    const textContent = data.content.find(c => c.type === 'text')?.text || '';
    const cleaned = textContent.replace(/```json|```/g, '').trim();
    const mealData = JSON.parse(cleaned);

    return res.status(200).json(mealData);
  } catch (error) {
    console.error('Erreur analyse repas:', error);
    return res.status(500).json({ error: 'Erreur lors de l\'analyse' });
  }
}
