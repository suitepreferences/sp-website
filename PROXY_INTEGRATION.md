# Proxy Integration Guide

## Overview

The checkout system now uses a secure proxy service instead of calling Lemon Squeezy directly. This keeps API keys secure on your backend while maintaining the same user experience.

## How It Works

### 1. Environment Detection

The system automatically detects the environment and routes to the appropriate proxy:

```javascript
const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

const API_BASE_URL = isLocalhost ? "https://create-checkout-dev.suitepreferences.com" : "https://create-checkout-prod.suitepreferences.com";
```

### 2. Plan Mapping

Frontend plan names are mapped to the format expected by your proxy:

| Frontend Plan | Proxy Plan    |
| ------------- | ------------- |
| Basic         | `basic`       |
| Pro Monthly   | `pro_monthly` |
| Pro Yearly    | `pro_yearly`  |

### 3. API Request Format

**Request:**

```json
POST https://create-checkout-{env}.suitepreferences.com
{
  "plan": "pro_yearly",
  "email": "user@example.com",
  "name": "User Name"
}
```

**Response:**

```json
{
  "checkout_id": "ae9ff84d-441d-4310-bece-ec2ae87a0d27",
  "checkout_url": "https://suitepreferences.lemonsqueezy.com/checkout/custom/ae9ff84d-4310-bece-ec2ae87a0d27?signature=..."
}
```

## Security Benefits

1. **API keys are secure** - Stored only on your backend
2. **No sensitive data in frontend** - Users can't see API keys
3. **Environment isolation** - Different services for dev/prod
4. **Origin-based routing** - Automatic environment detection

## Configuration

### Development

- **URL**: `https://create-checkout-dev.suitepreferences.com`
- **Triggered by**: `localhost:3000` or `127.0.0.1`

### Production

- **URL**: `https://create-checkout-prod.suitepreferences.com`
- **Triggered by**: `www.suitepreferences.com` or `suitepreferences.com`

## Testing

### Local Development

```bash
npm start
# Automatically routes to create-checkout-dev.suitepreferences.com
```

### Production

```bash
# Deploy to www.suitepreferences.com
# Automatically routes to create-checkout-prod.suitepreferences.com
```

## Error Handling

The system handles various error scenarios:

- Network errors
- Invalid responses
- Missing checkout URLs
- Proxy service errors

All errors are displayed to the user with helpful messages.

## Monitoring

Check browser console for:

- Configuration detection
- API call responses
- Error messages
- Environment routing

## Benefits

1. **Security** - API keys never exposed
2. **Maintainability** - Centralized checkout logic
3. **Scalability** - Backend handles traffic spikes
4. **Environment Management** - Automatic routing
5. **Cost Control** - Pay only for actual usage
