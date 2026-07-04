// 1. Наш шаблон
interface Product {
    title: string;
    price: number;
    isAvailable: boolean;
}

// 2. Наш объект по шаблону
const firstProduct: Product = {
    title: "Рюкзак Снаряжение",
    price: 29.99,
    isAvailable: true
};

// 3. Наша функция для этого шаблона
const printProductInfo = (item: Product): void => {
    console.log(`ТОВАР: ${item.title} | ЦЕНА: $${item.price} | В наличии: ${item.isAvailable}`);
};

// Вызов функции
printProductInfo(firstProduct);
