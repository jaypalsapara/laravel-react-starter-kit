# React starter kit for Laravel

This react starter kit use latest laravel structure and also follow the new shadcn/ui design system.

## Installation

```bash
composer create-project jaypalsapara/laravel-react-starter-kit --prefer-dist example-app
```

## Initial Setup

Navigate to your project and complete the setup:

```bash
cd example-app

# Setup the project
composer setup


# Start the development server
composer dev
```

## Verify Installation

Run the test suite to ensure everything is configured correctly:

```bash
composer test
```

You should see 100% test coverage and all quality checks passing.

# Available Tooling

## Development

- `composer dev` - Starts Laravel server, queue worker, log monitoring, and Vite+ dev server concurrently

## Code Quality

- `composer lint` - Runs Rector (refactoring), Pint (PHP formatting), and Oxfmt (JS/TS formatting)
- `composer lint:check` - Dry-run mode of lint

## Testing

- `composer types:check` - Runs PHPStan at level 7
- `composer test:type-coverage` - Ensures 100% type coverage with Pest
- `composer test:unit` - Runs Pest tests with 100% code coverage requirement
- `composer test` - Runs the complete test suite (linting, static analysis, type coverage, unit tests)

## Maintenance

- `composer update:requirements` - Updates all PHP and pnpm dependencies to latest versions

# License

Laravel React Starter Kit was created by [Jaypal Sapara](https://x.com/jaypal__sapara) under the [MIT license](https://opensource.org/license/MIT).
