# PregAI - EHG Pregnancy Monitoring Prototype (Version 1.0)

An AI-assisted pregnancy monitoring dashboard designed to analyze electrohysterography (EHG) signals and estimate the risk of preterm delivery.

## 🚀 Quick Start

### Option 1: Double-click (Windows)
Double-click `run.bat` to launch the development server.

### Option 2: Terminal
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local server:
   ```bash
   npm run dev
   ```
3. Open your browser at:
   ```
   http://localhost:5173/
   ```

## 🏗️ Production Build
To create an optimized production build:
```bash
npm run build
```
Production assets are generated in the `dist/` directory.

## 📁 Project Structure
- `src/data/mockData.js` - Mock telemetry, 13 EHG extracted features, event logs, and physiological EHG waveform generator.
- `src/services/api.js` - Service abstraction layer with placeholders for ESP32/ADS1115 hardware, Firebase Realtime Database/Firestore, and AI inference model.
- `src/components/` - Clean healthcare UI components (Waveform graph, Telemetry cards, AI Risk Assessment, Signal Quality, Extracted Features, Recent Events).
- `src/views/` - Tab views (Dashboard, Patient, EHG Signal, AI Prediction, Reports).

## ⚖️ Research Prototype Disclaimer
This software is an engineering research prototype for electrohysterography (EHG) signal analysis. It is **NOT** a clinical diagnostic system and does not replace professional medical diagnosis or clinical assessment.
