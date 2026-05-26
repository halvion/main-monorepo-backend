# Deployment Guide

## Quick Reference

### Local Development

```bash
# Start infrastructure (PostgreSQL, Redis, RabbitMQ)
docker-compose up -d

# Run services locally
npm run start:core
npm run start:booking
npm run start:venue
npm run start:payment
```

### Docker Build

```bash
# Build all services
docker build -t halvion-core -f apps/core-service/Dockerfile .
docker build -t halvion-booking -f apps/booking-service/Dockerfile .
docker build -t halvion-venue -f apps/venue-service/Dockerfile .
docker build -t halvion-payment -f apps/payment-service/Dockerfile .
```

### Kubernetes Deployment

```bash
# Apply all manifests
kubectl apply -f k8s/base/namespace.yaml
kubectl apply -f k8s/base/secrets.yaml   # Update secrets first!
kubectl apply -f k8s/base/configmap.yaml
kubectl apply -f k8s/base/

# Check status
kubectl get pods -n halvion
kubectl get services -n halvion
```

---

## File Structure

```
├── apps/
│   ├── core-service/
│   │   ├── .env              # Local config (gitignored)
│   │   ├── .env.example      # Template for devs
│   │   └── Dockerfile
│   ├── booking-service/
│   │   └── ...
│   ├── venue-service/
│   │   └── ...
│   └── payment-service/
│       └── ...
├── k8s/
│   └── base/
│       ├── namespace.yaml
│       ├── secrets.yaml      # Base64 encoded secrets
│       ├── configmap.yaml
│       ├── core-service.yaml
│       ├── booking-service.yaml
│       ├── venue-service.yaml
│       ├── payment-service.yaml
│       └── ingress.yaml
├── docker-compose.yml        # Local dev infrastructure
└── Dockerfile               # Generic multi-service build
```

---

## Environment Variables

| Variable          | Required | Description                      |
| ----------------- | -------- | -------------------------------- |
| `DATABASE_URL`    | ✅       | PostgreSQL connection string     |
| `JWT_SECRET`      | ✅       | Must match across all services   |
| `PORT`            | ✅       | Service port (3001-3004)         |
| `RABBITMQ_URL`    | ✅       | RabbitMQ connection              |
| `REDIS_URL`       | ✅       | Redis connection                 |
| `ALLOWED_ORIGINS` | ❌       | CORS whitelist (comma-separated) |

---

## Secrets Management

### Development

Use `.env` files per service (copy from `.env.example`)

### Production (Kubernetes)

1. Update `k8s/base/secrets.yaml` with base64-encoded values
2. Or use external secrets manager (recommended):
   - AWS Secrets Manager + External Secrets Operator
   - HashiCorp Vault
   - Azure Key Vault

Generate base64 secrets:

```bash
echo -n "your-secret" | base64
```

---

## Service Ports

| Service     | Port  |
| ----------- | ----- |
| Core (Auth) | 3001  |
| Booking     | 3002  |
| Venue       | 3003  |
| Payment     | 3004  |
| PostgreSQL  | 5432  |
| Redis       | 6379  |
| RabbitMQ    | 5672  |
| RabbitMQ UI | 15672 |
