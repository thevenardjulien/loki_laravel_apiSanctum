<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        // $products = Product::all();
        // $products->transform(function ($product) {
        // if($product->image) {
        // $product->image_url = url('storage/' . $product->image);
        // }
        // return $product;
        // });
        // return response()->json($products);

        $products = Product::orderBy('updated_at', 'desc')->get();
        return response()->json($products, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:png,jpg,jpeg,gif,webp|max:2048',
            'description' => 'nullable|string',
            'stock' => 'required|integer',
            'price' => 'required|integer',
            'color' => 'required|string|max:255',
            'sizes' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');

            $product = Product::create([
                'title' => $request->title,
                'category' => $request->category,
                'image' => $imagePath,
                'description' => $request->description,
                'stock' => $request->stock,
                'price' => $request->price,
                'color' => $request->color,
                'sizes' => $request->sizes,
            ]);

            return response()->json($product, 201);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
