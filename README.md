# TeeGPT-Expo (Prototype)

This is a ready-to-run **Expo** project prototype for TeeGPT (voice + TTS + ChatGPT + splash + local history).

IMPORTANT: Replace the OpenAI API key placeholder before running locally. Do **not** commit real keys to public repositories.

## Steps to run locally (dev)

1. Install dependencies (requires Node.js and npm/yarn):
   ```bash
   cd TeeGPT-Expo
   npm install
   ```

2. Add your OpenAI API key (development only):
   - Open `app.json` and replace `PLACEHOLDER_OPENAI_API_KEY` under `expo.extra.OPENAI_API_KEY` with your real key.
   - For production, use EAS Build + EAS secrets instead (recommended).

3. Start Metro / Expo Dev Tools:
   ```bash
   npx expo start
   ```

4. Native voice requires native modules. To run on a real Android device locally, do a prebuild then run:
   ```bash
   npx expo prebuild
   npx expo run:android
   ```
   Or use EAS Build for cloud builds:
   ```bash
   npm install -g eas-cli
   eas login
   eas build -p android
   ```

## Notes
- This app uses `@react-native-voice/voice` (native) for speech recognition; Expo Go cannot run it without prebuilding.
- The included `assets/icon.png` and `assets/splash.png` were generated/provided earlier.
- Don't forget to secure your OpenAI key (EAS secrets or backend proxy).

Enjoy!

