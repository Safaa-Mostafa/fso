import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductForm from "../ProductForm";
import { beforeEach } from "vitest";

const mockCategories = [
  { _id: "cat1", name: "Category 1" },
  { _id: "cat2", name: "Category 2" },
];

describe("ProductForm component", () => {
  let createProduct;
  let newProduct;
  let setNewProduct;

  beforeEach(() => {
    setNewProduct = vi.fn();
    createProduct = vi.fn((e) => e.preventDefault());
    newProduct = {
      name: "",
      slug: "",
      description: "",
      images: [],
      price: "",
      discountPrice: "",
      stock: "",
      category: "",
      brand: "",
    }
  })


test("renders all inputs and buttons", () => {
  render(
    <ProductForm
      createProduct={createProduct}
      newProduct={newProduct}
      setNewProduct={setNewProduct}
    />
  );

  expect(screen.getByPlaceholderText(/product Name/i)).toBeDefined();
  expect(screen.getByPlaceholderText(/product Slug/i)).toBeDefined();
  expect(screen.getByPlaceholderText(/product Description/i)).toBeDefined();
  expect(screen.getByPlaceholderText(/Brand/i)).toBeDefined();
  expect(screen.getByPlaceholderText(/^Price$/i)).toBeDefined();
  expect(screen.getByPlaceholderText(/Discount Price/i)).toBeDefined();
  expect(screen.getByPlaceholderText(/Stock/i)).toBeDefined();

  expect(screen.getByRole("button", { name: /Add Product/i })).toBeDefined();
  expect(screen.getByRole("button", { name: /Add Image/i })).toBeDefined();
});

test("calls setNewProduct when typing in text inputs", async () => {
  const user = userEvent.setup();
  render(
    <ProductForm
      createProduct={createProduct}
      newProduct={newProduct}
      setNewProduct={setNewProduct}
    />
  );

  const nameInput = screen.getByPlaceholderText(/Product Name/i);
  await user.type(nameInput, "Test Product");
  expect(setNewProduct).toHaveBeenCalled();

  const slugInput = screen.getByPlaceholderText(/Product Slug/i);
  await user.type(slugInput, "test-product");
  expect(setNewProduct).toHaveBeenCalled();

  const descInput = screen.getByPlaceholderText(/Product Description/i);
  await user.type(descInput, "Some description");
  expect(setNewProduct).toHaveBeenCalled();

  const brandInput = screen.getByPlaceholderText(/Brand/i);
  await user.type(brandInput, "Test Brand");
  expect(setNewProduct).toHaveBeenCalled();
})

  test('calls setNewProduct when typing in number inputs', async () => {
  const user = userEvent.setup();
  render(
    <ProductForm
      createProduct={createProduct}
      newProduct={newProduct}
      setNewProduct={setNewProduct}
    />
  );

   const priceInput = screen.getByPlaceholderText(/^Price$/i)
   
    await user.type(priceInput, '100')
    expect(setNewProduct).toHaveBeenCalled()

    const discountInput = screen.getByPlaceholderText(/Discount Price/i)
    await user.type(discountInput, '80')
    expect(setNewProduct).toHaveBeenCalled()

    const stockInput = screen.getByPlaceholderText(/Stock/i)
    await user.type(stockInput, '50')
    expect(setNewProduct).toHaveBeenCalled()
})

test('can add and remove image inputs', async () => {
    const user = userEvent.setup()
    render(
      <ProductForm
        createProduct={createProduct}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
      />
    )

    const addButton = screen.getByRole('button', { name: /add image/i })
    await user.click(addButton)
    expect(setNewProduct).toHaveBeenCalled()
       newProduct.images = [{ url: '' }]
    render(
      <ProductForm
        createProduct={createProduct}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
      />
    )
    const removeButton = screen.getByRole('button', { name: /remove/i })
    await user.click(removeButton)
    expect(setNewProduct).toHaveBeenCalled()
  })

   test('calls setNewProduct when selecting category', async () => {
    const user = userEvent.setup()
    render(
      <ProductForm
        createProduct={createProduct}
        newProduct={{ ...newProduct, category: '' }}
        setNewProduct={setNewProduct}
      />
    )

    const select = screen.getByRole('combobox')
    await user.selectOptions(select, '')
    expect(setNewProduct).toHaveBeenCalled()
  })

    test('calls createProduct on form submit', async () => {
    const user = userEvent.setup()
    render(<ProductForm createProduct={createProduct} newProduct={newProduct} setNewProduct={setNewProduct}/>)

    const submitButton = screen.getByRole('button', { name: /add product/i })
    await user.click(submitButton)
    expect(createProduct).toHaveBeenCalledTimes(1)
  })
})