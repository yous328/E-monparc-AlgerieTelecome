<?php

namespace Database\Factories\Providers;

use Faker\Provider\Base;

class AlgerianNameProvider extends Base
{
    protected static $maleFirstNames = [
        'Karim',
        'Nassim',
        'Yacine',
        'Farid',
        'Rachid',
        'Amine',
        'Mohamed',
        'Sofiane',
        'Samir',
        'Adel'
    ];

    protected static $femaleFirstNames = [
        'Amel',
        'Zahra',
        'Nadia',
        'Lamia',
        'Khadidja',
        'Sabrina',
        'Fatima',
        'Amina',
        'Lila',
        'Hanane'
    ];

    protected static $lastNames = [
        'Bensalem',
        'Chikhi',
        'Aït Ahmed',
        'Boualem',
        'Benali',
        'Touati',
        'Benkhaled',
        'Saidi',
        'Haddad',
        'Khelifi'
    ];

    public function algerianFirstName($gender = null)
    {
        $gender = $gender ?? (rand(0, 1) ? 'male' : 'female');

        return $gender === 'male'
            ? static::randomElement(static::$maleFirstNames)
            : static::randomElement(static::$femaleFirstNames);
    }

    public function algerianLastName()
    {
        return static::randomElement(static::$lastNames);
    }
}
