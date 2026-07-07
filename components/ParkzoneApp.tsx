"use client";

import { useReducer } from "react";
import { reducer, initialState, computeTotal, type Screen } from "@/lib/state";
import { BottomNav } from "@/components/shell/BottomNav";
import {
  WelcomeScreen,
  LoginScreen,
  ForgotPasswordScreen,
  SignupPerfilScreen,
  SignupVehiculoScreen,
  SignupPagoScreen,
  SignupSaldoScreen,
} from "@/components/screens/auth";
import {
  HomeScreen,
  MeterDetectedScreen,
  ParametrosScreen,
  PagoScreen,
  PaySuccessScreen,
  EstadoScreen,
} from "@/components/screens/parking";
import {
  PerfilScreen,
  ConfigurarVehiculoScreen,
  PagosMenuScreen,
  MetodosDePagoScreen,
  AgregarTarjetaScreen,
  SaldoScreen,
  HistorialScreen,
} from "@/components/screens/account";

const NAVLESS_SCREENS: Screen[] = [
  "welcome",
  "login",
  "forgotPassword",
  "signupPerfil",
  "signupVehiculo",
  "signupPago",
  "signupSaldo",
  "paySuccess",
];

export function ParkzoneApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const go = (screen: Screen) => dispatch({ type: "GO", screen });

  const screens: Record<Screen, React.ReactNode> = {
    welcome: <WelcomeScreen onContinue={() => go("login")} />,
    login: (
      <LoginScreen
        onLogin={() => dispatch({ type: "LOGIN" })}
        onForgot={() => go("forgotPassword")}
        onSignup={() => go("signupPerfil")}
      />
    ),
    forgotPassword: (
      <ForgotPasswordScreen onBack={() => go("login")} onDone={() => go("login")} />
    ),
    signupPerfil: (
      <SignupPerfilScreen
        onBack={() => go("login")}
        onNext={(nombre, apellidos, correo) =>
          dispatch({ type: "SIGNUP_PROFILE", nombre, apellidos, correo })
        }
      />
    ),
    signupVehiculo: (
      <SignupVehiculoScreen
        onBack={() => go("signupPerfil")}
        onNext={(vehiculo) => dispatch({ type: "SIGNUP_VEHICULO", vehiculo })}
        onSkip={() => go("signupPago")}
      />
    ),
    signupPago: (
      <SignupPagoScreen
        onBack={() => go("signupVehiculo")}
        onNext={() => go("signupSaldo")}
        onSkip={() => go("signupSaldo")}
      />
    ),
    signupSaldo: (
      <SignupSaldoScreen
        onBack={() => go("signupPago")}
        onDone={() => dispatch({ type: "SIGNUP_DONE" })}
      />
    ),
    home: (
      <HomeScreen
        onEstacionar={() => {
          dispatch({ type: "SET_PENDING_MINUTES", minutes: 0, extend: false });
          go("meterDetected");
        }}
      />
    ),
    meterDetected: (
      <MeterDetectedScreen onBack={() => go("home")} onSelect={() => go("parametros")} />
    ),
    parametros: (
      <ParametrosScreen
        title="Parámetros"
        minutes={state.pendingMinutes}
        vehiculo={state.vehiculo}
        onMinutesChange={(minutes) =>
          dispatch({ type: "SET_PENDING_MINUTES", minutes, extend: false })
        }
        onConfirm={() => dispatch({ type: "CONFIRM_PARAMETROS" })}
        onCancel={() => go("home")}
        onBack={() => go("meterDetected")}
      />
    ),
    pago: (
      <PagoScreen
        total={computeTotal(state.pendingMinutes)}
        tarjeta={state.tarjeta}
        onPay={() => dispatch({ type: "PAY" })}
        onCancel={() => go("home")}
        onBack={() => go(state.extendMode ? "agregarTiempo" : "parametros")}
        onAddCard={() => go("agregarTarjeta")}
      />
    ),
    paySuccess: (
      <PaySuccessScreen
        onDone={() => dispatch({ type: "SET_TAB", tab: "estado" })}
      />
    ),
    estado: (
      <EstadoScreen
        session={state.session}
        vehiculo={state.vehiculo}
        onEstacionar={() => {
          dispatch({ type: "SET_PENDING_MINUTES", minutes: 0, extend: false });
          go("meterDetected");
        }}
        onAgregarTiempo={() => {
          dispatch({ type: "SET_PENDING_MINUTES", minutes: 0, extend: true });
          go("agregarTiempo");
        }}
        onConfirm={() => dispatch({ type: "SET_TAB", tab: "inicio" })}
        onBack={() => dispatch({ type: "SET_TAB", tab: "inicio" })}
      />
    ),
    agregarTiempo: (
      <ParametrosScreen
        title="Agregar tiempo"
        minutes={state.pendingMinutes}
        vehiculo={state.vehiculo}
        onMinutesChange={(minutes) =>
          dispatch({ type: "SET_PENDING_MINUTES", minutes, extend: true })
        }
        onConfirm={() => dispatch({ type: "PAY" })}
        onCancel={() => go("estado")}
        onBack={() => go("estado")}
      />
    ),
    perfil: (
      <PerfilScreen
        nombre={state.profile.nombre || "María"}
        onConfigurarVehiculo={() => go("configurarVehiculo")}
        onMetodosDePago={() => go("metodosDePago")}
        onLogout={() => dispatch({ type: "LOGOUT" })}
      />
    ),
    configurarVehiculo: (
      <ConfigurarVehiculoScreen
        vehiculo={state.vehiculo}
        onSave={(vehiculo) => {
          dispatch({ type: "SET_VEHICULO", vehiculo });
          go("perfil");
        }}
        onBack={() => go("perfil")}
      />
    ),
    pagosMenu: (
      <PagosMenuScreen
        onMetodos={() => go("metodosDePago")}
        onSaldo={() => go("saldo")}
        onHistorial={() => go("historial")}
      />
    ),
    metodosDePago: (
      <MetodosDePagoScreen
        tarjeta={state.tarjeta}
        onAddCard={() => go("agregarTarjeta")}
        onBack={() => go("pagosMenu")}
      />
    ),
    agregarTarjeta: (
      <AgregarTarjetaScreen
        onRegister={(tarjeta) => {
          dispatch({ type: "SET_TARJETA", tarjeta });
          go("metodosDePago");
        }}
        onBack={() => go("metodosDePago")}
      />
    ),
    saldo: <SaldoScreen saldo={state.saldo} onBack={() => go("pagosMenu")} />,
    historial: (
      <HistorialScreen session={state.session} onBack={() => go("pagosMenu")} />
    ),
  };

  const showNav = !NAVLESS_SCREENS.includes(state.screen);

  return (
    <div className="flex h-full flex-col">
      <div className="min-h-0 flex-1 overflow-hidden">{screens[state.screen]}</div>
      {showNav && (
        <BottomNav
          active={state.activeTab}
          onChange={(tab) => dispatch({ type: "SET_TAB", tab })}
        />
      )}
    </div>
  );
}
