import React, { useRef } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { colors } from '../constants/theme';

const WebAuthnWebView = ({ visible, onResult, operation, options }) => {
  const webViewRef = useRef(null);

  const getWebAuthnScript = (action, options) => `
    (async function() {
      try {
        if (!window.PublicKeyCredential) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            success: false,
            error: 'WebAuthn not supported'
          }));
          return;
        }

        // Convert base64url strings back to ArrayBuffers for WebAuthn
        function base64urlToArrayBuffer(base64url) {
          const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
          const padding = base64.length % 4;
          const paddedBase64 = base64 + '='.repeat(padding ? 4 - padding : 0);
          const binary = atob(paddedBase64);
          const array = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) {
            array[i] = binary.charCodeAt(i);
          }
          return array.buffer;
        }

        function arrayBufferToBase64url(buffer) {
          const array = new Uint8Array(buffer);
          const binary = String.fromCharCode.apply(null, array);
          const base64 = btoa(binary);
          return base64.replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=/g, '');
        }

        // Prepare options for WebAuthn
        const webauthnOptions = JSON.parse('${JSON.stringify(options)}');
        
        if (webauthnOptions.publicKey.challenge) {
          webauthnOptions.publicKey.challenge = base64urlToArrayBuffer(webauthnOptions.publicKey.challenge);
        }
        
        if (webauthnOptions.publicKey.user && webauthnOptions.publicKey.user.id) {
          webauthnOptions.publicKey.user.id = base64urlToArrayBuffer(webauthnOptions.publicKey.user.id);
        }

        ${action === 'create' ? `
          const credential = await navigator.credentials.create(webauthnOptions);
          
          if (credential) {
            const response = {
              success: true,
              credential: {
                id: credential.id,
                rawId: arrayBufferToBase64url(credential.rawId),
                type: credential.type,
                response: {
                  attestationObject: arrayBufferToBase64url(credential.response.attestationObject),
                  clientDataJSON: arrayBufferToBase64url(credential.response.clientDataJSON)
                }
              }
            };
            window.ReactNativeWebView.postMessage(JSON.stringify(response));
          } else {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              success: false,
              error: 'Credential creation failed'
            }));
          }
        ` : `
          if (webauthnOptions.publicKey.allowCredentials) {
            webauthnOptions.publicKey.allowCredentials.forEach(cred => {
              if (typeof cred.id === 'string') {
                cred.id = base64urlToArrayBuffer(cred.id);
              }
            });
          }

          const credential = await navigator.credentials.get(webauthnOptions);
          
          if (credential) {
            const response = {
              success: true,
              credential: {
                id: credential.id,
                rawId: arrayBufferToBase64url(credential.rawId),
                type: credential.type,
                response: {
                  authenticatorData: arrayBufferToBase64url(credential.response.authenticatorData),
                  clientDataJSON: arrayBufferToBase64url(credential.response.clientDataJSON),
                  signature: arrayBufferToBase64url(credential.response.signature)
                }
              }
            };
            window.ReactNativeWebView.postMessage(JSON.stringify(response));
          } else {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              success: false,
              error: 'Authentication failed'
            }));
          }
        `}
      } catch (error) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          success: false,
          error: error.message
        }));
      }
    })();
  `;

  const handleMessage = (event) => {
    try {
      const result = JSON.parse(event.nativeEvent.data);
      onResult(result);
    } catch (error) {
      onResult({ success: false, error: 'Failed to parse response' });
    }
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>WebAuthn - Clarity</title>
    </head>
    <body>
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: -apple-system, BlinkMacSystemFont, sans-serif; background-color: ${colors.light.background};">
        <div style="text-align: center; padding: 20px;">
          <h2 style="color: ${colors.primary}; margin-bottom: 16px;">Setting up secure access...</h2>
          <p style="color: ${colors.light.textSecondary}; font-size: 16px;">Please follow the prompts on your device to complete the setup.</p>
          <div style="margin-top: 24px;">
            <div style="width: 40px; height: 40px; border: 3px solid ${colors.primary}; border-top: 3px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto;"></div>
          </div>
        </div>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
      <script>
        ${getWebAuthnScript(operation, options)}
      </script>
    </body>
    </html>
  `;

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <WebView
          ref={webViewRef}
          source={{ html: htmlContent }}
          onMessage={handleMessage}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          style={styles.webView}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  webView: {
    flex: 1,
  },
});

export default WebAuthnWebView;