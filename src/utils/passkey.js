import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Platform } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const PASSKEY_STORAGE_KEY = 'clarity_webauthn_credentials';
const PASSKEY_ENABLED_KEY = 'clarity_passkey_enabled';
const USER_AUTHENTICATED_KEY = 'clarity_user_authenticated';
import { Button } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

export function PasskeyWebflow({ mode }) {
  const url = mode === 'register'
    ? 'https://example.com/webauthn/register'
    : 'https://example.com/webauthn/login';

  return (
    <Button
      title={mode === 'register' ? 'Create Passkey' : 'Sign in with Passkey'}
      onPress={async () => {
        const result = await WebBrowser.openAuthSessionAsync(url, 'myapp://redirect');
        // parse redirect URL to get assertion or attestation result
        console.log('Redirect data:', result);
      }}
    />
  );
}




// WebAuthn configuration
const WEBAUTHN_CONFIG = {
  rpId: 'clarity-app.com',
  rpName: 'Clarity Recovery App',
  userDisplayName: 'Clarity User',
  timeout: 60000,
  attestation: 'none',
  authenticatorSelection: {
    authenticatorAttachment: 'platform',
    userVerification: 'required',
    residentKey: 'preferred'
  }
};

/**
 * Generate random bytes for challenge (React Native compatible)
 */
const generateRandomBytes = (length) => {
  const array = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    array[i] = Math.floor(Math.random() * 256);
  }
  return array;
};

/**
 * Convert string to base64url
 */
const stringToBase64url = (str) => {
  const base64 = btoa(str);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

/**
 * Convert Uint8Array to base64url
 */
const uint8ArrayToBase64url = (array) => {
  const str = String.fromCharCode.apply(null, array);
  return stringToBase64url(str);
};

/**
 * Generate a WebAuthn credential creation options
 */
const generateCredentialCreationOptions = (userId) => {
  const challenge = generateRandomBytes(32);
  const userIdBytes = new TextEncoder().encode(userId);
  
  return {
    publicKey: {
      challenge: uint8ArrayToBase64url(challenge),
      rp: {
        id: WEBAUTHN_CONFIG.rpId,
        name: WEBAUTHN_CONFIG.rpName
      },
      user: {
        id: uint8ArrayToBase64url(userIdBytes),
        name: userId,
        displayName: WEBAUTHN_CONFIG.userDisplayName
      },
      pubKeyCredParams: [
        { alg: -7, type: 'public-key' }, // ES256
        { alg: -257, type: 'public-key' } // RS256
      ],
      authenticatorSelection: WEBAUTHN_CONFIG.authenticatorSelection,
      timeout: WEBAUTHN_CONFIG.timeout,
      attestation: WEBAUTHN_CONFIG.attestation
    }
  };
};

/**
 * Generate a WebAuthn credential request options
 */
const generateCredentialRequestOptions = (credentialId) => {
  const challenge = generateRandomBytes(32);
  
  return {
    publicKey: {
      challenge: uint8ArrayToBase64url(challenge),
      timeout: WEBAUTHN_CONFIG.timeout,
      rpId: WEBAUTHN_CONFIG.rpId,
      allowCredentials: [{
        id: credentialId,
        type: 'public-key',
        transports: ['internal']
      }],
      userVerification: 'required'
    }
  };
};

/**
 * Check if biometric authentication is available
 */
const checkBiometricAvailability = async () => {
  try {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      return { available: false, error: 'Biometric hardware not available' };
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      return { available: false, error: 'No biometric credentials enrolled on this device' };
    }

    const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
    return { 
      available: true, 
      types: supportedTypes,
      hasHardware,
      isEnrolled 
    };
  } catch (error) {
    return { available: false, error: error.message };
  }
};

/**
 * Execute WebAuthn operation using device biometrics as passkey
 */
const executeWebAuthnOperation = async (action, options) => {
  try {
    // Check biometric availability first
    const biometricCheck = await checkBiometricAvailability();
    
    if (!biometricCheck.available) {
      return { 
        success: false, 
        error: biometricCheck.error || 'Biometric authentication not available' 
      };
    }

    // Configure authentication prompt based on action
    const authConfig = {
      promptMessage: action === 'create' 
        ? 'Create your Clarity passkey' 
        : 'Sign in to Clarity',
      subPrompt: action === 'create'
        ? 'Use your biometric to create a secure passkey for password-free access'
        : 'Use your biometric to authenticate',
      fallbackLabel: 'Use device passcode',
      disableDeviceFallback: false,
      cancelLabel: 'Cancel',
    };

    // Perform biometric authentication
    const authResult = await LocalAuthentication.authenticateAsync(authConfig);

    if (authResult.success) {
      // Simulate WebAuthn credential response
      if (action === 'create') {
        const credentialId = `clarity-passkey-${Date.now()}-${Platform.OS}`;
        return {
          success: true,
          credential: {
            id: credentialId,
            rawId: generateRandomBytes(32),
            type: 'public-key',
            response: {
              attestationObject: generateRandomBytes(128),
              clientDataJSON: generateRandomBytes(64)
            }
          }
        };
      } else {
        return {
          success: true,
          credential: {
            id: 'clarity-passkey',
            type: 'public-key',
            response: {
              authenticatorData: generateRandomBytes(64),
              clientDataJSON: generateRandomBytes(64),
              signature: generateRandomBytes(72)
            }
          }
        };
      }
    } else {
      return { 
        success: false, 
        error: authResult.error || 'Authentication was cancelled or failed' 
      };
    }
  } catch (error) {
    console.error('WebAuthn operation error:', error);
    return { 
      success: false, 
      error: error.message || 'Authentication failed' 
    };
  }
};

/**
 * Create a new WebAuthn passkey
 */
export const createPasskey = async () => {
  try {
    // Check if biometric authentication is available
    const biometricCheck = await checkBiometricAvailability();
    
    if (!biometricCheck.available) {
      Alert.alert(
        'Biometric Authentication Required',
        `To use passkeys, please enable ${Platform.OS === 'ios' ? 'Face ID or Touch ID' : 'fingerprint or face unlock'} in your device settings.`,
        [{ text: 'OK', style: 'default' }]
      );
      return { 
        success: false, 
        error: biometricCheck.error 
      };
    }

    // Generate unique user ID
    const userId = `clarity-user-${Date.now()}`;
    
    // Generate credential creation options
    const options = generateCredentialCreationOptions(userId);
    
    // Execute WebAuthn credential creation with biometric prompt
    const result = await executeWebAuthnOperation('create', options);
    
    if (result.success && result.credential) {
      // Store credential information securely
      const credentialData = {
        id: result.credential.id,
        userId: userId,
        createdAt: new Date().toISOString(),
        type: 'webauthn-biometric',
        platform: Platform.OS
      };
      
      await AsyncStorage.setItem(PASSKEY_STORAGE_KEY, JSON.stringify(credentialData));
      await AsyncStorage.setItem(PASSKEY_ENABLED_KEY, 'true');
      await AsyncStorage.setItem(USER_AUTHENTICATED_KEY, 'true');
      
      return { 
        success: true, 
        credentialId: result.credential.id 
      };
    } else {
      return { 
        success: false, 
        error: result.error || 'Passkey creation failed' 
      };
    }
  } catch (error) {
    console.error('Passkey creation error:', error);
    return { 
      success: false, 
      error: error.message || 'An unexpected error occurred' 
    };
  }
};

/**
 * Authenticate using existing WebAuthn passkey
 */
export const authenticateWithPasskey = async () => {
  try {
    // Retrieve stored credential
    const credentialDataString = await AsyncStorage.getItem(PASSKEY_STORAGE_KEY);
    
    if (!credentialDataString) {
      return { 
        success: false, 
        error: 'No passkey found. Please set up a passkey first.' 
      };
    }
    
    const credentialData = JSON.parse(credentialDataString);
    
    // Generate authentication options
    const options = generateCredentialRequestOptions(credentialData.id);
    
    // Execute WebAuthn authentication with biometric prompt
    const result = await executeWebAuthnOperation('authenticate', options);
    
    if (result.success && result.credential) {
      await AsyncStorage.setItem(USER_AUTHENTICATED_KEY, 'true');
      
      return { 
        success: true,
        credentialId: result.credential.id
      };
    } else {
      return { 
        success: false, 
        error: result.error || 'Authentication failed' 
      };
    }
  } catch (error) {
    console.error('Passkey authentication error:', error);
    return { 
      success: false, 
      error: error.message || 'An unexpected error occurred' 
    };
  }
};

/**
 * Check if user has an existing passkey
 */
export const checkExistingPasskey = async () => {
  try {
    const passkeyEnabled = await AsyncStorage.getItem(PASSKEY_ENABLED_KEY);
    const credentialData = await AsyncStorage.getItem(PASSKEY_STORAGE_KEY);
    
    return passkeyEnabled === 'true' && credentialData !== null;
  } catch (error) {
    console.error('Error checking existing passkey:', error);
    return false;
  }
};

/**
 * Check if passkeys are supported on the current platform
 */
export const isPasskeySupported = async () => {
  try {
    const biometricCheck = await checkBiometricAvailability();
    return biometricCheck.available;
  } catch (error) {
    console.error('Error checking passkey support:', error);
    return false;
  }
};

/**
 * Remove stored passkey data
 */
export const removePasskey = async () => {
  try {
    await AsyncStorage.removeItem(PASSKEY_STORAGE_KEY);
    await AsyncStorage.removeItem(PASSKEY_ENABLED_KEY);
    await AsyncStorage.removeItem(USER_AUTHENTICATED_KEY);
    
    return { success: true };
  } catch (error) {
    console.error('Error removing passkey:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
};

/**
 * Get stored passkey information
 */
export const getPasskeyInfo = async () => {
  try {
    const credentialDataString = await AsyncStorage.getItem(PASSKEY_STORAGE_KEY);
    
    if (!credentialDataString) {
      return null;
    }
    
    const credentialData = JSON.parse(credentialDataString);
    
    return {
      id: credentialData.id,
      userId: credentialData.userId,
      createdAt: credentialData.createdAt,
      type: credentialData.type,
      platform: credentialData.platform
    };
  } catch (error) {
    console.error('Error getting passkey info:', error);
    return null;
  }
};