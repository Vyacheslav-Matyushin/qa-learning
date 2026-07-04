const arr = [
    { name: "Banan", price: 10, inStock: true },
    { name: "Arbuz", price: 20, inStock: false },
    { name: "Persik", price: 30, inStock: true }
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

console.log("=== ШАГ 1: ФИЛЬТРАЦИЯ ТОВАРОВ ===");
const arrFilter = arr.filter(item => item.inStock === true);
console.log(`Найдено товаров в наличии: ${arrFilter.length} \n`)
console.log("=== ШАГ 2: АВТОМАТИЧЕСКИЙ ЗАПУСК ТЕСТОВ ===");
arrFilter.forEach(async (item) => {
    await delay(1000);
    console.log(`🛒 [ТЕСТ] Товар "${item.name}" за $${item.price} успешно добавлен в корзину.`);
});
