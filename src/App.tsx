import { Route, BrowserRouter, Routes } from "react-router-dom";
import SigninPage from "@src/pages/account/SigninPage";
import AccountPage from "@src/pages/account/AccountPage";
import CarrelloPage from "@src/pages/cart/CarrelloPage";
import CategoriaPage from "@src/pages/CategoriaPage";
import CercaPage from "@src/pages/CercaPage";
import Error404Page from "@src/pages/Error404Page";
import HomePage from "@src/pages/HomePage";
import LoginPage from "@src/pages/account/LoginPage";
import Logout from "@src/pages/account/LogoutPage";
import VerificaAccountPage from "@src/pages/account/VerificaAccountPage";
import VerificaAccountTokenPage from "@src/pages/account/VerificaAccountTokenPage";
import LoginRequiredRoute from "@src/components/roles/LoginRequiredRoute";
import InformazioniPersonaliPage from "@src/pages/account/InformazioniPersonaliPage";
import ChangePasswordPage from "@src/pages/account/ChangePasswordPage";
import ResetPasswordPage from "@src/pages/account/ResetPasswordPage";
import ResetPasswordTokenPage from "@src/pages/account/ResetPasswordTokenPage";
import AdminRequiredRoute from "@src/components/roles/AdminRequiredRoute";
import Error403Page from "@src/pages/Error403Page";
import AdminCategoryListPage from "@src/pages/admin/category/AdminCategoryListPage";
import AdminCategoryEditPage from "@src/pages/admin/category/AdminCategoryEditPage";
import AdminCategoryCreatePage from "@src/pages/admin/category/AdminCategoryCreatePage";
import AdminCategoryDeletePage from "@src/pages/admin/category/AdminCategoryDeletePage";
import AdminFoodListPage from "@src/pages/admin/food/AdminListFoodPage";
import AdminCreateFoodPage from "@src/pages/admin/food/AdminCreateFoodPage";
import AdminEditFoodPage from "@src/pages/admin/food/AdminEditFoodPage";
import AdminDeleteFoodPage from "@src/pages/admin/food/AdminDeleteFoodPage";
import ImpostazioniGeneraliPage from "@src/pages/admin/settings/ImpostazioniGeneraliPage";
import AdminOrderStateListPage from "@src/pages/admin/orderState/AdminOrderStateListPage";
import AdminOrderStateCreatePage from "@src/pages/admin/orderState/AdminOrderStateCreatePage";
import AdminOrderStateEditPage from "@src/pages/admin/orderState/AdminOrderStateEditPage";
import AdminOrderStateDeletePage from "@src/pages/admin/orderState/AdminOrderStateDeletePage";
import TipologiaConsegnaPage from "@src/pages/checkout/TipologiaConsegnaPage";
import InformazioniConsegnaPage from "@src/pages/checkout/InformazioniConsegnaPage";
import RiepilogoOrdinePage from "@src/pages/checkout/RiepilogoOrdine";
import CartFilledRequiredRoute from "@src/components/roles/CartFilledRequredRoute";
import CompletamentoOrdinePage from "@src/pages/checkout/CompletamentoOrdinePage";
import OrderListPage from "@src/pages/account/order/OrderListPage";
import OrderDetailPage from "@src/pages/account/order/OrderDetailPage";
import OrderPaymentSuccessPage from "@src/pages/account/order/OrderPaymentSuccessPage";




function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomePage></HomePage>}></Route>
        <Route path="/cerca" element={<CercaPage></CercaPage>}></Route>
        <Route path="/categoria/:slug" element={<CategoriaPage></CategoriaPage>}></Route>
        <Route element={<LoginRequiredRoute></LoginRequiredRoute>}>
          <Route element={<CartFilledRequiredRoute></CartFilledRequiredRoute>}>
            <Route path="checkout">
              <Route path="tipologia-consegna" element={<TipologiaConsegnaPage />}></Route>
              <Route path="informazioni-consegna" element={<InformazioniConsegnaPage />}></Route>
              <Route path="riepilogo-ordine" element={<RiepilogoOrdinePage />}></Route>
              <Route path="creazione-ordine" element={<CompletamentoOrdinePage />} />
            </Route>
          </Route>
        </Route>
        <Route path="/account">
          <Route element={<LoginRequiredRoute></LoginRequiredRoute>}>
            <Route path="" element={<AccountPage></AccountPage>}></Route>
            <Route path="informazioni-personali" element={<InformazioniPersonaliPage></InformazioniPersonaliPage>}></Route>
            <Route path="cambia-password" element={<ChangePasswordPage></ChangePasswordPage>}></Route>
            <Route path="i-miei-ordini" element={<OrderListPage></OrderListPage>}></Route>
            <Route path="i-miei-ordini/:id" element={<OrderDetailPage></OrderDetailPage>}></Route>
            <Route path="i-miei-ordini/pagamento/successo" element={<OrderPaymentSuccessPage></OrderPaymentSuccessPage>}></Route>
          </Route>
          <Route path="login" element={<LoginPage></LoginPage>}></Route>
          <Route path="signin" element={<SigninPage></SigninPage>}></Route>
          <Route path="logout" element={<Logout></Logout>}></Route>
          <Route path="verifica-account" element={<VerificaAccountPage></VerificaAccountPage>}></Route>
          <Route path="verifica-account/token" element={<VerificaAccountTokenPage></VerificaAccountTokenPage>}></Route>
          <Route path="reset-password" element={<ResetPasswordPage></ResetPasswordPage>}></Route>
          <Route path="reset-password/token" element={<ResetPasswordTokenPage></ResetPasswordTokenPage>}></Route>
        </Route>
        <Route path="/amministrazione">
          <Route element={<LoginRequiredRoute></LoginRequiredRoute>}>
            <Route element={<AdminRequiredRoute></AdminRequiredRoute>}>
              <Route path="categorie">
                <Route path="" element={<AdminCategoryListPage></AdminCategoryListPage>}></Route>
                <Route path="crea" element={<AdminCategoryCreatePage></AdminCategoryCreatePage>}></Route>
                <Route path="modifica/:id" element={<AdminCategoryEditPage></AdminCategoryEditPage>}></Route>
                <Route path="elimina/:id" element={<AdminCategoryDeletePage></AdminCategoryDeletePage>}></Route>
              </Route>
              <Route path="cibi">
                <Route path="" element={<AdminFoodListPage></AdminFoodListPage>}></Route>
                <Route path="crea" element={<AdminCreateFoodPage></AdminCreateFoodPage>}></Route>
                <Route path="modifica/:id" element={<AdminEditFoodPage></AdminEditFoodPage>}></Route>
                <Route path="elimina/:id" element={<AdminDeleteFoodPage></AdminDeleteFoodPage>}></Route>
              </Route>
            </Route>

            <Route path="stati-ordine">
              <Route path="" element={<AdminOrderStateListPage />}></Route>
              <Route path="crea" element={<AdminOrderStateCreatePage />}></Route>
              <Route path="modifica/:id" element={<AdminOrderStateEditPage />}></Route>
              <Route path="elimina/:id" element={<AdminOrderStateDeletePage />}></Route>
            </Route>

            <Route path="impostazioni" element={<ImpostazioniGeneraliPage></ImpostazioniGeneraliPage>}>

            </Route>
          </Route>
        </Route>
        <Route path="/carrello" element={<CarrelloPage></CarrelloPage>}></Route>
        <Route path="/403" element={<Error403Page></Error403Page>}></Route>
        <Route path="*" element={<Error404Page></Error404Page>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
