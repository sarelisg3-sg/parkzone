export type Screen =
  | "welcome"
  | "login"
  | "forgotPassword"
  | "signupPerfil"
  | "signupVehiculo"
  | "signupPago"
  | "signupSaldo"
  | "home"
  | "meterDetected"
  | "parametros"
  | "pago"
  | "paySuccess"
  | "estado"
  | "agregarTiempo"
  | "perfil"
  | "configurarVehiculo"
  | "pagosMenu"
  | "metodosDePago"
  | "detalleTarjeta"
  | "agregarTarjeta"
  | "saldo"
  | "historial";

export type BottomTab = "inicio" | "pagos" | "perfil" | "estado";

export interface Vehiculo {
  placa: string;
  marca: string;
  modelo: string;
}

export interface Tarjeta {
  last4: string;
  name: string;
}

export interface ParkingSession {
  meterId: string;
  durationMinutes: number;
  total: number;
  startedAt: number; // epoch ms
}

export interface AppState {
  screen: Screen;
  activeTab: BottomTab;
  authed: boolean;
  profile: { nombre: string; apellidos: string; correo: string };
  vehiculo: Vehiculo;
  tarjeta: Tarjeta;
  saldo: number;
  pendingMinutes: number; // time picker selection in progress
  session: ParkingSession | null;
  extendMode: boolean; // true when the time picker is being used to add time to an existing session
  vehiculoReturn: Screen; // where ConfigurarVehiculoScreen sends you back after saving
  tarjetaReturn: Screen; // where AgregarTarjetaScreen/detail send you back
  menuOpen: boolean;
}

export const METER = {
  id: "A248",
  rate: 3.5, // per 15 min
  rateMinutes: 15,
  horario: "8:00 a 20:00",
};

export const initialState: AppState = {
  screen: "welcome",
  activeTab: "inicio",
  authed: false,
  profile: { nombre: "", apellidos: "", correo: "" },
  vehiculo: { placa: "ABC1234", marca: "Honda", modelo: "Civic" },
  tarjeta: { last4: "1234", name: "María" },
  saldo: 250,
  pendingMinutes: 0,
  session: null,
  extendMode: false,
  vehiculoReturn: "perfil",
  tarjetaReturn: "metodosDePago",
  menuOpen: false,
};

export type Action =
  | { type: "GO"; screen: Screen }
  | { type: "GO_CONFIGURAR_VEHICULO"; from: Screen }
  | { type: "GO_AGREGAR_TARJETA"; from: Screen }
  | { type: "GO_DETALLE_TARJETA"; from: Screen }
  | { type: "SET_MENU_OPEN"; open: boolean }
  | { type: "SET_TAB"; tab: BottomTab }
  | { type: "SIGNUP_PROFILE"; nombre: string; apellidos: string; correo: string }
  | { type: "SIGNUP_VEHICULO"; vehiculo: Vehiculo }
  | { type: "SIGNUP_DONE" }
  | { type: "LOGIN" }
  | { type: "SET_PENDING_MINUTES"; minutes: number; extend: boolean }
  | { type: "CONFIRM_PARAMETROS" }
  | { type: "PAY" }
  | { type: "CONFIRM_EXTEND" }
  | { type: "SET_VEHICULO"; vehiculo: Vehiculo }
  | { type: "SET_TARJETA"; tarjeta: Tarjeta }
  | { type: "LOGOUT" };

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "GO":
      return { ...state, screen: action.screen };
    case "GO_CONFIGURAR_VEHICULO":
      return { ...state, screen: "configurarVehiculo", vehiculoReturn: action.from };
    case "GO_AGREGAR_TARJETA":
      return { ...state, screen: "agregarTarjeta", tarjetaReturn: action.from };
    case "GO_DETALLE_TARJETA":
      return { ...state, screen: "detalleTarjeta", tarjetaReturn: action.from };
    case "SET_MENU_OPEN":
      return { ...state, menuOpen: action.open };
    case "SET_TAB": {
      const screenByTab: Record<BottomTab, Screen> = {
        inicio: "home",
        pagos: "pagosMenu",
        perfil: "perfil",
        estado: "estado",
      };
      return { ...state, activeTab: action.tab, screen: screenByTab[action.tab] };
    }
    case "SIGNUP_PROFILE":
      return {
        ...state,
        profile: { nombre: action.nombre, apellidos: action.apellidos, correo: action.correo },
        screen: "signupVehiculo",
      };
    case "SIGNUP_VEHICULO":
      return { ...state, vehiculo: action.vehiculo, screen: "signupPago" };
    case "SIGNUP_DONE":
      return { ...state, authed: true, screen: "home", activeTab: "inicio" };
    case "LOGIN":
      return { ...state, authed: true, screen: "home", activeTab: "inicio" };
    case "SET_PENDING_MINUTES":
      return { ...state, pendingMinutes: action.minutes, extendMode: action.extend };
    case "CONFIRM_PARAMETROS":
      return { ...state, screen: "pago" };
    case "PAY": {
      if (state.extendMode && state.session) {
        return {
          ...state,
          screen: "estado",
          activeTab: "estado",
          session: {
            ...state.session,
            durationMinutes: state.session.durationMinutes + state.pendingMinutes,
            total: state.session.total + computeTotal(state.pendingMinutes),
          },
        };
      }
      const total = (state.pendingMinutes / METER.rateMinutes) * METER.rate;
      return {
        ...state,
        screen: "paySuccess",
        session: {
          meterId: METER.id,
          durationMinutes: state.pendingMinutes,
          total,
          startedAt: Date.now(),
        },
      };
    }
    case "SET_VEHICULO":
      return { ...state, vehiculo: action.vehiculo };
    case "SET_TARJETA":
      return { ...state, tarjeta: action.tarjeta };
    case "LOGOUT":
      return { ...initialState };
    default:
      return state;
  }
}

export function computeTotal(minutes: number): number {
  return (minutes / METER.rateMinutes) * METER.rate;
}
