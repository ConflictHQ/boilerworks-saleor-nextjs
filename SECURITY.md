# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in Boilerworks, please report it responsibly.

**Do not open a public issue.**

Instead, email **security@weareconflict.com** with:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We will acknowledge your report within 48 hours and aim to release a fix within 7 days for critical issues.

## Supported Versions

| Version | Supported |
| ------- | --------- |
| latest  | Yes       |

## Security Best Practices

When deploying Boilerworks:

- Set a real `SECRET_KEY` in `docker/backend.env` (the default is a placeholder)
- Change the Postgres password (`POSTGRES_PASSWORD=saleor` in `docker/docker-compose.yml`)
- Change or remove the seeded admin account (`admin@example.com` / `admin` from `scripts/seed.sh`)
- Use HTTPS in production
- Set `NODE_ENV=production`
- Review the security hardening in `bootstrap.md`
