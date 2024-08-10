// pages/api/model.js

import { NextResponse } from 'next/server';
import * as onnx from 'onnxruntime-web';

// Load the model once
let session = null;
async function loadModel() {
    if (session) return session;
    try {
        session = await onnx.InferenceSession.create('/path/to/your/model.onnx');
        return session;
    } catch (error) {
        console.error('Error loading model:', error);
        throw new Error('Model loading failed');
    }
}

export async function POST(req) {
    const { code, language } = await req.json();

    if (!code || !language) {
        return NextResponse.json({ error: 'Code and language fields are required.' }, { status: 400 });
    }

    if (language !== 'python' && language !== 'javascript') {
        return NextResponse.json({ error: `Unsupported language: ${language}` }, { status: 400 });
    }

    try {
        const model = await loadModel();

        // Example: Prepare input for the model and run inference
        // This part depends on your model and its input requirements

        // Dummy example of handling input
        const input = { code: code };
        const output = await model.run({ input });

        return NextResponse.json({ suggestion: output });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Error processing request. Please try again later.' }, { status: 500 });
    }
}
