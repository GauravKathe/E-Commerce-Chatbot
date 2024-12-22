import React, { useState } from 'react';
import styled from 'styled-components';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const MessagesContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
`;

const Message = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${props => props.isUser ? '#dcf8c6' : '#f0f0f0'};
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;

const SendButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
`;

const LogoutButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  background-color: #dc3545;
  color: white;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #c82333;
  }
`;

function Chat({ setAuthenticated }) {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [cart, setCart] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);

  const products = {
    iphone: [
      { id: 1, name: "iPhone 15 Pro Max", price: 1099, specs: "256GB, Titanium", stock: 10 },
      { id: 2, name: "iPhone 15", price: 799, specs: "128GB, Multiple Colors", stock: 15 },
      { id: 3, name: "iPhone 14 Pro", price: 899, specs: "128GB, Space Black", stock: 8 },
      { id: 4, name: "iPhone 14", price: 699, specs: "128GB, Midnight", stock: 12 },
      { id: 5, name: "iPhone 13", price: 599, specs: "128GB, Multiple Colors", stock: 20 }
    ],
    samsung: [
      { id: 6, name: "Samsung Galaxy S23 Ultra", price: 1199, specs: "256GB", stock: 10 },
      { id: 7, name: "Samsung Galaxy S23+", price: 999, specs: "128GB", stock: 15 },
      { id: 8, name: "Samsung Galaxy S23", price: 799, specs: "128GB", stock: 18 },
      { id: 9, name: "Samsung Galaxy A54 5G", price: 449, specs: "128GB", stock: 25 },
      { id: 10, name: "Samsung Galaxy A34 5G", price: 399, specs: "64GB", stock: 30 }
    ],
    dell: [
      { id: 11, name: "Dell XPS 13", price: 999, specs: "i5, 8GB RAM, 256GB SSD", stock: 8 },
      { id: 12, name: "Dell XPS 15", price: 1499, specs: "i7, 16GB RAM, 512GB SSD", stock: 6 },
      { id: 13, name: "Dell Inspiron 15", price: 699, specs: "i5, 8GB RAM, 256GB SSD", stock: 12 },
      { id: 14, name: "Dell G15 Gaming", price: 899, specs: "i7, 16GB RAM, RTX 3050", stock: 10 },
      { id: 15, name: "Dell Latitude 5420", price: 1299, specs: "i7, 16GB RAM, 512GB SSD", stock: 5 }
    ],
    accessories: [
      { id: 16, name: "AirPods Pro", price: 249, specs: "2nd Generation", stock: 20 },
      { id: 17, name: "Samsung Galaxy Buds2 Pro", price: 199, specs: "Wireless", stock: 15 },
      { id: 18, name: "Apple Watch Series 9", price: 399, specs: "GPS, 41mm", stock: 12 },
      { id: 19, name: "Samsung Galaxy Watch 6", price: 299, specs: "44mm", stock: 18 },
      { id: 20, name: "Phone Cases", price: 29, specs: "Various Models", stock: 50 }
    ],
    tablets: [
      { id: 21, name: "iPad Pro", price: 799, specs: "11-inch, M2 chip", stock: 10 },
      { id: 22, name: "iPad Air", price: 599, specs: "10.9-inch, M1 chip", stock: 15 },
      { id: 23, name: "Samsung Galaxy Tab S9", price: 699, specs: "11-inch", stock: 12 },
      { id: 24, name: "Samsung Galaxy Tab A8", price: 229, specs: "10.5-inch", stock: 20 },
      { id: 25, name: "Microsoft Surface Pro 9", price: 999, specs: "13-inch", stock: 8 }
    ]
  };

  const formatProduct = (product) => {
    return `${product.name} - $${product.price} (${product.specs}) [Stock: ${product.stock}]`;
  };

  const handlePurchase = (productId) => {
    const allProducts = Object.values(products).flat();
    const product = allProducts.find(p => p.id === productId);
    
    if (product && product.stock > 0) {
      setCart([...cart, product]);
      return `Great choice! I've added ${product.name} to your cart.\nWould you like to:\n1. Continue shopping\n2. View cart\n3. Proceed to checkout`;
    }
    return "Sorry, that product is out of stock.";
  };

  const viewCart = () => {
    if (cart.length === 0) {
      return "Your cart is empty.";
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    return "Your cart:\n" + 
           cart.map(item => `- ${item.name} ($${item.price})`).join('\n') +
           `\n\nTotal: $${total}\n\nWould you like to:\n1. Continue shopping\n2. Proceed to checkout\n3. Clear cart`;
  };

  const checkout = () => {
    if (cart.length === 0) {
      return "Your cart is empty. Let me help you find some products!";
    }
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    setCart([]); // Clear cart after checkout
    return `Thank you for your purchase!\nTotal paid: $${total}\n\nYour order will be processed and shipped soon.\nWould you like to continue shopping?`;
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    // Cart and checkout handling
    if (message.includes('view cart')) {
      return viewCart();
    }
    
    if (message.includes('checkout') || message.includes('buy now')) {
      return checkout();
    }

    if (message.includes('clear cart')) {
      setCart([]);
      return "Cart cleared. What would you like to shop for?";
    }

    // Purchase handling
    if (message.includes('buy') && message.includes('number')) {
      const number = parseInt(message.match(/\d+/));
      if (number) {
        return handlePurchase(number);
      }
    }

    // Product category listings
    if (message.includes('iphone')) {
      return "Here are our available iPhones:\n" + 
             products.iphone.map(p => `${p.id}. ${formatProduct(p)}`).join('\n') +
             "\n\nTo purchase, type 'buy number X' where X is the product number.";
    }
    
    if (message.includes('samsung')) {
      return "Here are our available Samsung phones:\n" + 
             products.samsung.map(p => `${p.id}. ${formatProduct(p)}`).join('\n') +
             "\n\nTo purchase, type 'buy number X' where X is the product number.";
    }
    
    if (message.includes('dell')) {
      return "Here are our available Dell laptops:\n" + 
             products.dell.map(p => `${p.id}. ${formatProduct(p)}`).join('\n') +
             "\n\nTo purchase, type 'buy number X' where X is the product number.";
    }

    if (message.includes('tablet')) {
      return "Here are our available tablets:\n" + 
             products.tablets.map(p => `${p.id}. ${formatProduct(p)}`).join('\n') +
             "\n\nTo purchase, type 'buy number X' where X is the product number.";
    }

    if (message.includes('accessor')) {
      return "Here are our available accessories:\n" + 
             products.accessories.map(p => `${p.id}. ${formatProduct(p)}`).join('\n') +
             "\n\nTo purchase, type 'buy number X' where X is the product number.";
    }

    // General category queries
    if (message.includes('electronics') || message.includes('products') || message.includes('show')) {
      return "Here are our product categories:\n" +
             "1. Smartphones\n" +
             "   - iPhones\n" +
             "   - Samsung phones\n" +
             "2. Laptops\n" +
             "   - Dell laptops\n" +
             "3. Tablets\n" +
             "   - iPads\n" +
             "   - Samsung tablets\n" +
             "4. Accessories\n" +
             "   - AirPods\n" +
             "   - Smartwatches\n" +
             "   - Cases\n\n" +
             "What would you like to see? Just ask for a specific category!";
    }

    // Help message
    if (message.includes('help')) {
      return "I can help you with:\n" +
             "1. Browsing products (e.g., 'show iPhones')\n" +
             "2. Adding items to cart (e.g., 'buy number 1')\n" +
             "3. Viewing your cart ('view cart')\n" +
             "4. Checking out ('checkout')\n" +
             "5. Clearing your cart ('clear cart')\n" +
             "What would you like to do?";
    }

    // Default response
    return "I can help you shop! Try:\n" +
           "- Show me products\n" +
           "- Show iPhones\n" +
           "- Show Samsung phones\n" +
           "- Show tablets\n" +
           "- Show accessories\n" +
           "Or type 'help' for more options!";
  };

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage = { text: input, isUser: true };
    setMessages([...messages, userMessage]);

    const botResponse = { text: getBotResponse(input), isUser: false };
    setMessages(prevMessages => [...prevMessages, botResponse]);

    setInput('');
  };

  return (
    <ChatContainer>
      <LogoutButton onClick={() => setAuthenticated(false)}>Logout</LogoutButton>
      <MessagesContainer>
        {messages.map((message, index) => (
          <Message key={index} isUser={message.isUser}>
            {message.text}
          </Message>
        ))}
      </MessagesContainer>
      <InputContainer>
        <Input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
        />
        <SendButton onClick={handleSend}>Send</SendButton>
      </InputContainer>
    </ChatContainer>
  );
}

export default Chat; 