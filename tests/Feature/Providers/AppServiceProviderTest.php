<?php

declare(strict_types=1);

use App\Providers\AppServiceProvider;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Validation\Rules\Password;

it('configures application defaults in production', function (): void {
    $this->app->detectEnvironment(fn (): string => 'production');

    $this->app->register(AppServiceProvider::class);

    expect(Date::now())->toBeInstanceOf(CarbonImmutable::class);

    $rules = Password::defaults();

    expect($rules)->toBeInstanceOf(Password::class);
});

it('configures application defaults outside production', function (): void {
    $this->app->detectEnvironment(fn (): string => 'local');

    $this->app->register(AppServiceProvider::class);

    expect(Date::now())->toBeInstanceOf(CarbonImmutable::class);

    expect(Password::defaults())->toBeInstanceOf(Password::class);
});
