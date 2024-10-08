const Gesture = {
    Tap: jest.fn(() => ({
      maxDuration: jest.fn().mockReturnThis(),
      onBegin: jest.fn().mockReturnThis(),
      onEnd: jest.fn().mockReturnThis(),
      onFinalize: jest.fn().mockReturnThis(),
    })),
  };
  
  module.exports = {
    Gesture,
  };
  