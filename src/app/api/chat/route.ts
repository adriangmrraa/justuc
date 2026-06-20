import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { messages, caseData } = await req.json();

    const systemPrompt = `Eres un asistente especializado en el sistema judicial de la provincia de Tucumán, Argentina. 
Tu función es ayudar a ciudadanos a entender el estado de sus causas judiciales y orientarlos en el proceso.

INFORMACIÓN DE CONTEXTO DEL USUARIO:
${caseData ? JSON.stringify(caseData, null, 2) : 'El usuario no tiene causas activas en este momento.'}

REGLAS IMPORTANTES:
- NO eres un abogado. NO puedes dar asesoramiento legal vinculante.
- Tu función es INFORMATIVA y ORIENTATIVA.
- Explicá términos legales en lenguaje simple.
- Ayudá al usuario a entender qué documentos puede necesitar.
- Si no sabes algo, decilo claramente.
- Respondé SIEMPRE en español.
- Sé empático — las personas que consultan están pasando por situaciones difíciles.
- Si el usuario menciona una emergencia o riesgo de violencia, recomendale llamar al 911 o a la línea 137.`;

    const completion = await client.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      stream: true,
      max_tokens: 2048,
      temperature: 0.7,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        } catch (err) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: 'Error en la transmisión' })}\n\n`));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    return Response.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
