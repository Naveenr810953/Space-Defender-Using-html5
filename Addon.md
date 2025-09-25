# 🎮 Ball Catcher Game - Addon Features Branch

This branch contains experimental addon features and enhancements for the HTML5 Ball Catcher Game.

## 🌟 New Features Added

### 🎯 Enhanced Gameplay
- **Power-ups System**
  - Speed Boost: Temporarily increases platform speed
  - Shield: Protects against missed balls
  - Multi-ball: Creates additional balls for bonus points

### 🎨 Visual Improvements
- **Particle Effects**
  - Explosion effects when balls are caught
  - Trail effects for projectiles
  - Level-up animations

### 🔊 Audio Enhancements
- **Background Music**
  - Dynamic soundtrack that changes with levels
  - 3D spatial audio for immersive experience

### 📱 Advanced Mobile Support
- **Gesture Controls**
  - Swipe gestures for movement
  - Pinch to zoom game view
  - Shake device for special power-up

## 🚀 Quick Start

### Prerequisites
- Node.js (for local development server)
- Modern web browser with Web Audio API support

### Installation
```bash
# Clone the repository
git clone https://github.com/naveenr810953/my-html5-game.git

# Switch to addon-features branch
git checkout addon-features

# Install dependencies (if any)
npm install

# Start local server
npm run dev
```

## 📁 Branch Structure
```
addon-features/
├── src/
│   ├── powerups/          # Power-up system
│   ├── particles/         # Particle effects engine
│   ├── audio/             # Enhanced audio system
│   └── mobile/            # Advanced mobile controls
├── assets/
│   ├── sounds/            # New sound effects
│   ├── music/             # Background music tracks
│   └── particles/         # Particle effect assets
└── docs/                  # Documentation
```

## 🎮 New Controls

**Keyboard Shortcuts**
- `P` - Pause game
- `M` - Toggle music
- `1, 2, 3` - Activate power-ups
- `F` - Fullscreen toggle

**Mobile Gestures**
- Swipe Left/Right - Move platform
- Double Tap - Shoot projectile
- Pinch - Zoom in/out
- Shake - Emergency shield

## 🔧 Configuration

**Game Settings**

Edit `src/config.js` to customize:
```javascript
const config = {
    difficulty: 'medium', // easy, medium, hard
    audio: {
        musicVolume: 0.7,
        effectsVolume: 0.9,
        spatialAudio: true
    },
    graphics: {
        particles: true,
        shadows: true,
        antiAliasing: true
    },
    controls: {
        swipeSensitivity: 1.5,
        gyroEnabled: false
    }
};
```

## 🧪 Experimental Features

**Features in Testing**
- Gyroscope Controls – Tilt device to move platform
- Voice Commands – "Left", "Right", "Shoot" voice control
- Multiplayer – Local co-op mode (experimental)
- Procedural Levels – Dynamically generated levels

**How to Enable Experimental Features**
```javascript
// Enable experimental features
localStorage.setItem('experimentalFeatures', 'true');
// Refresh the game to apply changes
```

## 📊 Performance Notes

**Recommended Specifications**
- Desktop: 2GB RAM, WebGL support
- Mobile: iOS 12+/Android 8+, Gyroscope (optional)

**Optimization Tips**
- Disable particles on low-end devices
- Reduce audio quality on mobile
- Lower frame rate cap to 30fps if needed

## 🐛 Known Issues

**Current Limitations**
- Gyroscope controls may be jittery on some devices
- Voice commands require HTTPS connection
- Multiplayer mode has synchronization issues

**Workarounds**
- Use touch controls if gyroscope isn't working
- Enable "Spatial Audio Off" if experiencing lag
- Clear browser cache if assets don't load properly

## 🤝 Contributing to This Branch

**Development Setup**
1. Fork the repository
2. Create feature branch from `addon-features`
3. Test changes thoroughly
4. Submit pull request to `addon-features` branch

**Testing Guidelines**
- Test on at least 3 different browsers
- Verify mobile responsiveness
- Check performance on low-end devices
- Validate audio across different platforms

## 📈 Feature Roadmap

**Phase 1 (Current)**
- Power-up system
- Particle effects
- Enhanced audio
- Mobile gestures

**Phase 2 (Next)**
- Online leaderboards
- Achievement system
- Custom ball skins
- Level editor

**Phase 3 (Future)**
- VR support
- Cross-platform sync
- Tournament mode
- Modding support

## 🔄 Merge Strategy

**Merging to Main**

Features will be merged to main branch when:
- ✅ Thoroughly tested
- ✅ Performance optimized
- ✅ Mobile compatible
- ✅ Documentation complete

**Branch Maintenance**
- Regular rebase with main branch
- Weekly performance testing
- Monthly feature reviews

## 📞 Support

**Reporting Issues**
Please include:
- Browser/device information
- Steps to reproduce
- Console errors (if any)

**Contact**
- Developer: Naveen Kumar S
- Email: navee4147@gmail.com

**Main Branch:** `main`

## 📜 License

This branch follows the same MIT License as the main project. See LICENSE for details.
