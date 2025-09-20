// user
export const userSelect = {
  id: true,
  name: true,
  nickname: true,
};

export const meSelect = {
  id: true,
  name: true,
  nickname: true,
  email: true,
  createdAt: true,
  updatedAt: true,
};

// dish
export const dishSelect = {
  id: true,
  title: true,
  description: true,
  imageUrl: true,
  cookingTime: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: userSelect,
  },
  recipe: {
    select: recipeSelect,
  },
  dishIngredient: {
    select: dishIngredientSelect,
  },
  _count: {
    select: {
      likes: true,
      comments: true,
    },
  },
};

// comment
export const commentSelect = {
  id: true,
  content: true,
  createdAt: true,
  updatedAt: true,
};

// recipe
export const recipeSelect = {
  id: true,
  stepNumber: true,
  instruction: true,
  imageUrl: true,
  duration: true,
  createdAt: true,
  updatedAt: true,
};

// ingredient
export const ingredientSelect = {
  id: true,
  name: true,
  createdAt: true,
  updatedAt: true,
};

// dishIngredient
export const dishIngredientSelect = {
  quantity: true,
  unit: true,
  createdAt: true,
  updatedAt: true,
  ingredient: {
    select: ingredientSelect,
  },
};
