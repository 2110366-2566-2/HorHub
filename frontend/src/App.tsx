import "./App.css";
import HomePage from "./pages/home/HomePage";
import NavigationBar from "./components/NavBar/NavigationBar";
import Footbar from "./components/Footer/Footbar";
import RegisterPage from "./pages/register/RegisterPage";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { UserProvider } from "./lib/context/UserContext";
import ProfilePage from "./pages/profile/ProfilePage";
import MailVerifyPage from "./pages/register/MailVerifyPage";
import AccVerifyTempPage from "./pages/register/AccVerifyTempPage";
import SuccessVerifyPage from "./pages/register/SuccessVerifyPage";
import SettingSidebar from "./components/Setting/SettingSidebar";
import SettingLayout from "./pages/profile/setting/SettingLayout";
import AccountPage from "./pages/profile/setting/setting-page/AccountPage";
import ProfileSettingPage from "./pages/profile/setting/setting-page/ProfileSettingPage";
import NotFoundPage from "./pages/etc/NotFoundPage";
import EmailChangePage from "./pages/profile/setting/setting-page/EmailChangePage";
import DeleteAccountPage from "./pages/profile/setting/setting-page/DeleteAccountPage";
import PaymentInformationPage from "./pages/profile/setting/setting-page/PaymentInformationPage";
import PasswordChangePage from "./pages/profile/setting/setting-page/PasswordChangePage";
import FailVerifyPopup from "./pages/register/FailVerifyPopup";
import DormPage from "./pages/dorm/[id]/DormPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProviderPageLayout from "./pages/provider/ProviderPageLayout";
import ProviderDormListPage from "./pages/provider/dorm/ProviderDormListPage";
import EditDormPage from "./pages/provider/dorm/EditDormPage";
import CreateRoomTypePage from "./pages/provider/dorm/roomtype/CreateRoomTypePage";
import EditRoomTypePage from "./pages/provider/dorm/roomtype/EditRoomTypePage";
import CreateDormPage from "./pages/provider/dorm/CreateDormPage";
import BookingPage from "./pages/booking/BookingPage";
import SearchDorm from "./pages/search/SearchDorm";
import BookingListPage from "./pages/booking/BookingListPage";
import ProviderDashboardLayout from "./pages/provider/dorm/ProviderDashboardLayout";
import ProviderBookingLayout from "./pages/provider/dorm/ProviderBookingLayout";
import BookPage from "./pages/provider/dorm/reservation/BookPage";
import DormList from "./pages/search/DormList";
import ChatPage from "./pages/chat/ChatPage";
import WithDrawnPage from "./pages/wallet/WithDrawnPage";
import PaymentPage from "./pages/payment/PaymentPage";
import MobileBankingPage from "./pages/payment/MobileBankingPage";
import CreditCardPage from "./pages/payment/CreditCardPage";
import TopUpPage from "./pages/wallet/TopUpPage";
import PaymentPage2 from "./pages/payment/PaymentPage2";
import SuccessPaymentTempPage from "./pages/payment/SuccessPaymentTempPage";
import ReceiptPage from "./pages/booking/receipt/ReceiptPage";
import MyWallet from "./pages/wallet/MyWallet";
import AllWalletPage from "./pages/wallet/AllWalletPage";
import SupportDashboard from "./pages/support/SupportDashboard";
import CreateIssue from "./pages/support/CreateIssue";
import EditIssuePage from "./pages/support/EditIssuePage";
import IssuePage from "./pages/support/IssuePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="profile" element={<ProfilePage />} />

            <Route path="settings">
              <Route element={<SettingLayout />}>
                <Route path="profile" element={<ProfileSettingPage />} />
                <Route path="account" element={<AccountPage />} />
                <Route path="password" element={<PasswordChangePage />} />
                <Route path="email" element={<EmailChangePage />} />
                <Route path="delete" element={<DeleteAccountPage />} />

                <Route path="topup" element={<TopUpPage />} />
                <Route
                  path="payment_information"
                  element={<PaymentInformationPage />}
                />
              </Route>
            </Route>

            <Route path="dorms" element={<DormList />} />
            <Route path="provider">
              <Route element={<ProviderPageLayout />}>
                <Route path="" element={<Navigate to="dorms" />} />
                <Route path="dorms" element={<ProviderDormListPage />} />
                {/* <Route path="*" element={<Navigate to="dorms" />} /> */}
                <Route path="dorms/:id" element={<ProviderDashboardLayout />}>
                  <Route path="" element={<Navigate to="info" />} />
                  <Route path="info" element={<DormPage isEdit={true} />} />
                  {/*<Route path="reservation" element={<ProviderBooking />} />*/}
                  <Route path="reservation" element={<ProviderBookingLayout />}>
                    <Route path=":roomId" element={<BookPage />}></Route>
                  </Route>
                  {/*<Route path="*" element={<Navigate to="info" />} />*/}
                </Route>
              </Route>
            </Route>

            {/* <Route path="provider/dorms" element={<ProviderDormListPage />} /> */}
            <Route path="provider/dorms/create" element={<CreateDormPage />} />
            <Route
              path="provider/dorms/:dormId/edit"
              element={<EditDormPage />}
            />
            <Route
              path="provider/dorms/:dormId/rooms/create"
              element={<CreateRoomTypePage />}
            />
            <Route
              path="provider/dorms/:dormId/rooms/:roomtypeId/edit"
              element={<EditRoomTypePage />}
            />

            <Route path="verify" element={<MailVerifyPage />} />
            <Route path="verify/success" element={<SuccessVerifyPage />} />
            <Route path="verify/:id" element={<AccVerifyTempPage />} />
            <Route
              path="provider/dorms/:dormId/edit"
              element={<EditDormPage />}
            />
            <Route
              path="provider/dorms/:dormId/rooms/create"
              element={<CreateRoomTypePage />}
            />
            <Route
              path="provider/dorms/:dormId/rooms/:roomtypeId/edit"
              element={<EditRoomTypePage />}
            />

            <Route path="verify" element={<MailVerifyPage />} />
            <Route path="verify/success" element={<SuccessVerifyPage />} />
            <Route path="verify/:id" element={<AccVerifyTempPage />} />

            <Route path="dorms/:id" element={<DormPage isEdit={false} />} />
            {/* <Route path="dorms/create" element={<CreateDormPage />} /> */}
            <Route
              path="dorms/:dormId/rooms/:roomtypeId/booking"
              element={<BookingPage />}
            />

            <Route path="verify" element={<MailVerifyPage />} />
            <Route path="verify/success" element={<SuccessVerifyPage />} />
            <Route path="verify/:id" element={<AccVerifyTempPage />} />

            <Route path="support" element={<SupportDashboard />} />
            <Route path="support/create" element={<CreateIssue />} />
            <Route path="support/:issueId/edit" element={<EditIssuePage />} />
            <Route path="support/:issueId/view" element={<IssuePage />} />

            <Route path="bookings" element={<BookingListPage />} />
            <Route
              path="bookings/:bookingId/payment"
              element={<PaymentPage />}
            />

            <Route path="chats" element={<ChatPage />} />
            <Route path="chats/:chatId" element={<ChatPage />} />
            <Route path="my-wallet/withdrawn" element={<WithDrawnPage />} />
            <Route path="my-wallet" element={<MyWallet />} />
            <Route path="my-wallet/all" element={<AllWalletPage />} />
            <Route
              path="bookings/:bookingId/Payment2"
              element={<PaymentPage2 />}
            />
            <Route
              path="bookings/:bookingId/Payment/creditCard"
              element={<CreditCardPage />}
            />
            <Route
              path="bookings/:bookingId/Payment/mobileBanking"
              element={<MobileBankingPage />}
            />
            <Route
              path="bookings/:bookingId/receipt"
              element={<ReceiptPage />}
            />

            <Route
              path="bookings/:bookingId/payment/success/:checkoutToken"
              element={<SuccessPaymentTempPage />}
            />

            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
          <Footbar />
          <ToastContainer />
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
