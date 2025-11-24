-- CreateIndex
CREATE INDEX "instructions_recipe_id_idx" ON "instructions"("recipe_id");

-- CreateIndex
CREATE INDEX "recipe_ingredients_recipe_id_idx" ON "recipe_ingredients"("recipe_id");

-- CreateIndex
CREATE INDEX "recipe_ingredients_ingredient_id_idx" ON "recipe_ingredients"("ingredient_id");

-- CreateIndex
CREATE INDEX "recipes_user_id_idx" ON "recipes"("user_id");
