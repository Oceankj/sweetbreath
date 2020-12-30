import React, { useState, useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Up, scrollToAnchor } from "../Anchor";
import Navbar from "../Navbar";
import AdminNavbar from "../AdminNavbar";
import Footer from "../Footer";
import {
  HomePage,
  AboutPage,
  LoginPage,
  LogoutPage,
  RegisterPage,
  ProductListPage,
  ProductPage,
  NewsPage,
  ContactUsPage,
  CartPage,
  CheckoutPage,
  OrderConfirmPage,
  MemberPage,
  AdminPage,
  AdminProductListPage,
  AdminProductPage,
  AdminMemberPage,
  AdminOrderListPage,
  AdminNewsPage,
  AdminCategoryPage,
  OrderListPage,
} from "../../pages";
import AuthContext from "../../contexts";
import { getMe } from "../../WebAPI";
import { getAuthToken, ScrollToTop } from "../../utils";

function Navbars({ user }) {
  if (!user || !user.is_admin) {
    return <Navbar />;
  }
  return <AdminNavbar />;
}

function App() {
  const [user, setUser] = useState(null); // useState("customer")

  useEffect(() => {
    if (getAuthToken()) {
      getMe().then((response) => {
        if (response.ok) {
          setUser(response.data);
        }
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <Navbars user={user} />
        <ScrollToTop />
        <Up onClick={() => scrollToAnchor("top")}>
          <span>⇧</span>
        </Up>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/about">
            <AboutPage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/logout">
            <LogoutPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/products">
            <ProductListPage />
          </Route>
          <Route exact path="/product/:id">
            <ProductPage />
          </Route>
          <Route exact path="/news">
            <NewsPage />
          </Route>
          <Route exact path="/contact">
            <ContactUsPage />
          </Route>
          <Route exact path="/cart">
            <CartPage />
          </Route>
          <Route exact path="/checkout">
            <CheckoutPage />
          </Route>
          <Route exact path="/order">
            <OrderConfirmPage />
          </Route>
          <Route exact path="/orders">
            <OrderListPage />
          </Route>
          <Route exact path="/member">
            <MemberPage />
          </Route>
          <Route exact path="/admin/">
            <AdminPage />
          </Route>
          <Route exact path="/admin/products">
            <AdminProductListPage />
          </Route>
          <Route path="/admin/product/">
            <AdminProductPage />
          </Route>
          <Route path="/admin/category/">
            <AdminCategoryPage />
          </Route>
          <Route exact path="/admin/member">
            <AdminMemberPage />
          </Route>
          <Route exact path="/admin/orders">
            <AdminOrderListPage />
          </Route>
          <Route exact path="/admin/news">
            <AdminNewsPage />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
