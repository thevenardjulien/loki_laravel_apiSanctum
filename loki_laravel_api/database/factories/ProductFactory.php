<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->name(),
            'category' => $this->faker->word(),
            'image' => $this->faker->imageUrl(),
            'description' => $this->faker->sentence(),
            'stock' => $this->faker->numberBetween(1, 100),
            'price' => $this->faker->numberBetween(1, 100),
            'color' => $this->faker->hexColor(),
            'sizes' => implode(',', $this->faker->randomElements(['XS', 'S', 'M', 'L', 'XL', 'XXL'], $this->faker->numberBetween(1, 3), false)),
        ];
    }
}
