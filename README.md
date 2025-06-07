# Legal-Saathi

A comprehensive legal assistance platform with multi-modal input handling, AI-powered legal reasoning, and automated form filling capabilities.

## Features

- Multi-modal input handling (voice, text, image)
- Azure OpenAI API integration for legal reasoning
- Bhashini API integration for translation
- Python-based AI agent for form automation
- Auto-fill functionality for legal forms
- Interactive data collection workflow

## Tech Stack

- Frontend: Next.js with TypeScript
- Styling: Tailwind CSS
- State Management: Zustand
- AI/ML: Azure OpenAI, Tesseract.js
- Form Automation: Python (Selenium)
- Translation: Bhashini API

## Setup Instructions

### Frontend Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file with required environment variables:
   ```
   AZURE_OPENAI_API_KEY=your_api_key
   AZURE_OPENAI_ENDPOINT=your_endpoint
   AZURE_OPENAI_MODEL_NAME=your_model_name
   BHASHINI_API_KEY=your_api_key
   BHASHINI_API_ENDPOINT=your_endpoint
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

### Python Service Setup

1. Navigate to the python service directory:
   ```bash
   cd python_service
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask server:
   ```bash
   python app.py
   ```

## Project Structure

```
legal-saathi/
├── src/
│   ├── app/           # Next.js app router pages
│   ├── components/    # React components
│   ├── lib/          # Utility functions and API clients
│   ├── hooks/        # Custom React hooks
│   ├── types/        # TypeScript type definitions
│   └── styles/       # CSS/styling files
├── public/           # Static assets
├── python_service/   # Python backend service
│   ├── app.py
│   └── requirements.txt
└── package.json
```

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License. 