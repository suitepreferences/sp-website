// Checkout Proxy Service Configuration
// Automatically routes to the appropriate proxy service based on environment

const isLocalhost = window.location.hostname === "localhost";

const API_BASE_URL = isLocalhost
    ? "https://create-checkout-dev.suitepreferences.com"
    : "https://create-checkout-prod.suitepreferences.com";

// Export the checkout service configuration
export const checkoutConfig = {
    baseUrl: API_BASE_URL,
    // Helper function to get the current environment name
    getEnvironment: () => {
        return isLocalhost ? 'development' : 'production';
    }
};

export default checkoutConfig; 
