const { Queue } = require('bullmq');
const config = require('../config');
const MyQueueSingleton = require('/home/chris/dev/bullmq_experiment/queue_def_v6_heroku_tls');
SECRET_password = config.redis.redis_password;

describe('MyQueueSingleton', () => {
  let originalConfig;

  beforeEach(() => {
    // Save the original config to restore it later
    originalConfig = { ...config.redis };

    // Mock the config to control the environment for tests
    config.redis = {
      host: 'localhost',
      port: 6379,
      username: null,
      password: SECRET_password,
      tls: { rejectUnauthorized: false }
    };
  });

  afterEach(() => {
    // Restore the original config after each test
    config.redis = originalConfig;

    // Ensure the singleton is reset after each test
    delete MyQueueSingleton.instance;
  });

  it('should create a new queue instance with correct configuration', () => {
    // Act
    const queueInstance = MyQueueSingleton.getInstance();

    // Assert
    expect(queueInstance).toBeInstanceOf(Queue);
    expect(queueInstance.opts.connection).toEqual({
      host: 'localhost',
      port: 6379,
      username: null,
      password: SECRET_password,
      tls: { rejectUnauthorized: false }
    });
  });

  it('should reuse the existing queue instance when called multiple times', () => {
    // Act
    const firstInstance = MyQueueSingleton.getInstance();
    const secondInstance = MyQueueSingleton.getInstance();

    // Assert
    expect(firstInstance).toBe(secondInstance);
  });

  it('should log the correct connection string', () => {
    // Arrange
    const logSpy = jest.spyOn(console, 'log');

    // Act
    MyQueueSingleton.getInstance();

    // Assert
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('connection:'));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(JSON.stringify(config.redis)));

    // Cleanup
    logSpy.mockRestore();
  });

  it('should throw an error with invalid Redis configuration', () => {
    // Arrange
    config.redis = {}; // Provide an empty config

    // Act & Assert
    expect(() => MyQueueSingleton.getInstance()).toThrow();

    // Cleanup is handled in afterEach
  });

  it('should handle null or undefined values gracefully', () => {
    // Arrange
    config.redis = {
      url: null,
      tls_url: undefined,
      redis_host: 'localhost',
      redis_port: 6379,
      password: null
    };

    // Act
    const queueInstance = MyQueueSingleton.getInstance();

    // Assert
    expect(queueInstance).toBeInstanceOf(Queue);
    // Specific assertions for handling null/undefined can be added here
  });
});
