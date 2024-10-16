import React, { useState } from "react";
import { Link } from "react-router-dom"; // Link를 react-router-dom에서 import
import styles from "../css/Shop/Shop.module.css"; // 스타일시트 import

function Navbar() {
  return (
    <nav className={styles.navbar}> 
      <ul>
        <li><Link to="#">마일리지 쿠폰</Link></li> 
        <li><Link to="/purchase">마일리지 사용</Link></li> 
        <li><Link to="/history">마일리지 내역</Link></li>
      </ul>
    </nav>
  );
}

function CouponPurchase() {
  const [quantity, setQuantity] = useState(1); // 상태 관리

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <div className={styles['coupon-purchase']}>
      <h2>마일리지 쿠폰 구매</h2>
      <input type="text" placeholder="구매하실 쿠폰 명칭을 입력해 주세요" />
      <p>
        사용안내: 마일리지 사용 가이드 및 약관을 확인하세요. 구매 시 10,000 마일리지가 적립됩니다.
        <br />
        * 10% 수수료가 추가됩니다.
      </p>
      <div className={styles['select-container']}>
        <label htmlFor="quantity">구매 수량:</label>
        <select
          id="quantity"
          value={quantity}
          onChange={handleQuantityChange}
          className={styles['quantity-select']}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <button className={styles['purchase-button']}>구매</button>
      </div>
    </div>
  );
}

function CouponRegister() {
  return (
    <div className={styles['coupon-register']}>
      <h2>마일리지 쿠폰 등록</h2>
      <input type="text" placeholder="쿠폰 번호 입력" />
      <button className={styles['purchase-button']}>입력</button>
    </div>
  );
}

function ShopPage() {  
  return (
    <div className={styles['shop-page']}>
      <Navbar />
      <main>
        <CouponPurchase />
        <CouponRegister />
      </main>
    </div>
  );
}

export default ShopPage;
