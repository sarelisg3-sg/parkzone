"use client";

import { useState } from "react";
import { User, Car, Banknote, DollarSign, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/Input/Input";
import { Stepper } from "@/components/Stepper";
import { StatusBar } from "@/components/shell/StatusBar";
import { Header } from "@/components/shell/Header";
import { LogoMark, LogoWordmark } from "@/components/shell/Logo";
import type { Vehiculo } from "@/lib/state";

/* Shared button styles matching the Figma prototype */
export const primaryBtn =
  "block w-full h-12 rounded-[var(--ds-radius-lg)] bg-brand-800 text-white text-[length:var(--ds-text-base)] font-medium cursor-pointer transition-colors hover:bg-brand-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500";
export const accentBtn =
  "block w-full h-12 rounded-[var(--ds-radius-lg)] bg-brand-400 text-white text-[length:var(--ds-text-base)] font-medium cursor-pointer transition-colors hover:bg-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500";
export const textLink =
  "block w-full text-center text-[length:var(--ds-text-sm)] font-semibold text-brand-800 cursor-pointer";

export function WelcomeScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <button
      onClick={onContinue}
      className="flex h-full w-full cursor-pointer flex-col bg-neutral-50 text-left"
      aria-label="Continuar"
    >
      <StatusBar />
      <div className="flex flex-1 flex-col items-center justify-center gap-6 pb-16">
        <LogoMark className="h-40 w-40" />
        <LogoWordmark />
      </div>
    </button>
  );
}

export function LoginScreen({
  onLogin,
  onForgot,
  onSignup,
}: {
  onLogin: () => void;
  onForgot: () => void;
  onSignup: () => void;
}) {
  return (
    <div className="flex h-full flex-col bg-neutral-50">
      <StatusBar />
      <form
        className="flex flex-1 flex-col px-6 pt-20"
        onSubmit={(e) => {
          e.preventDefault();
          onLogin();
        }}
      >
        <LogoWordmark className="text-[length:var(--ds-text-xl)]" />
        <h2 className="mt-14 text-center text-[length:var(--ds-text-base)] font-semibold text-brand-800">
          Iniciar Sesión
        </h2>
        <div className="mt-6 flex flex-col gap-4">
          <Input
            label="Correo Electrónico"
            type="email"
            placeholder="Ingresa tu correo"
          />
          <Input label="Contraseña" type="password" placeholder="••••••••" />
        </div>
        <button
          type="button"
          onClick={onForgot}
          className="mt-3 self-end text-[length:var(--ds-text-sm)] text-brand-800 cursor-pointer"
        >
          ¿Olvidaste tu contraseña?
        </button>
        <button type="submit" className={`${primaryBtn} mt-6`}>
          Iniciar Sesión
        </button>
        <p className="mt-8 text-center text-[length:var(--ds-text-sm)] text-brand-800">
          ¿No tienes cuenta?{" "}
          <button
            type="button"
            onClick={onSignup}
            className="font-bold cursor-pointer"
          >
            Crear cuenta
          </button>
        </p>
      </form>
    </div>
  );
}

export function ForgotPasswordScreen({
  onBack,
  onDone,
}: {
  onBack: () => void;
  onDone: () => void;
}) {
  return (
    <div className="flex h-full flex-col bg-neutral-50">
      <Header title="Olvidaste tu contraseña" onBack={onBack} />
      <form
        className="flex flex-1 flex-col px-6 pt-12"
        onSubmit={(e) => {
          e.preventDefault();
          onDone();
        }}
      >
        <h2 className="text-center text-[length:var(--ds-text-md)] font-bold text-neutral-800">
          Establecer nueva contraseña
        </h2>
        <p className="mt-2 text-center text-[length:var(--ds-text-sm)] text-neutral-600">
          Tu nueva contraseña debe ser diferente de las contraseñas que has
          usado anteriormente
        </p>
        <div className="mt-8 flex flex-col gap-4">
          <Input
            label="Nueva contraseña*"
            type="password"
            placeholder="Introduce tu nueva contraseña"
          />
          <Input
            label="Confirmar contraseña*"
            type="password"
            placeholder="Introduce tu nueva contraseña"
          />
        </div>
        <ul className="mt-5 flex flex-col gap-2">
          {[
            "Debe tener al menos 8 caracteres",
            "Debe incluir al menos un carácter especial",
          ].map((rule) => (
            <li
              key={rule}
              className="flex items-center gap-2 text-[length:var(--ds-text-xs)] text-neutral-800"
            >
              <CheckCircle2 className="h-4 w-4 text-brand-800" />
              {rule}
            </li>
          ))}
        </ul>
        <button
          type="submit"
          className={`${primaryBtn} mt-8 rounded-[var(--ds-radius-full)]`}
        >
          Crear
        </button>
      </form>
    </div>
  );
}

/* ── Signup stepper shell ─────────────────────────────────── */

function SignupShell({
  step,
  icon: Icon,
  title,
  children,
  onBack,
}: {
  step: number;
  icon: typeof User;
  title: string;
  children: React.ReactNode;
  onBack: () => void;
}) {
  return (
    <div className="flex h-full flex-col bg-neutral-50">
      <Header title="Crear cuenta" onBack={onBack} />
      <div className="flex flex-1 flex-col overflow-y-auto pt-8">
        <Icon className="mx-auto h-12 w-12 text-brand-800" strokeWidth={1.8} />
        <div className="mt-6">
          <Stepper current={step} />
        </div>
        <h2 className="mt-6 text-center text-[length:var(--ds-text-base)] font-semibold text-brand-800">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}

export function SignupPerfilScreen({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: (nombre: string, apellidos: string, correo: string) => void;
}) {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  return (
    <SignupShell step={0} icon={User} title="Mi perfil" onBack={onBack}>
      <form
        className="flex flex-1 flex-col px-6 pt-4 pb-8"
        onSubmit={(e) => {
          e.preventDefault();
          onNext(nombre, apellidos, correo);
        }}
      >
        <div className="flex flex-col gap-4">
          <Input
            label="Nombre"
            placeholder="Ingresa tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <Input
            label="Apellidos"
            placeholder="Ingresa tus apellidos"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
          />
          <Input
            label="Correo Electrónico"
            type="email"
            placeholder="Ingresa tu correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          <Input
            label="Contraseña"
            type="password"
            placeholder="Ingresa tu contraseña"
          />
        </div>
        <button type="submit" className={`${primaryBtn} mt-8`}>
          Registrarse
        </button>
      </form>
    </SignupShell>
  );
}

export function SignupVehiculoScreen({
  onBack,
  onNext,
  onSkip,
}: {
  onBack: () => void;
  onNext: (vehiculo: Vehiculo) => void;
  onSkip: () => void;
}) {
  const [placa, setPlaca] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  return (
    <SignupShell step={1} icon={Car} title="Mi vehículo" onBack={onBack}>
      <form
        className="flex flex-1 flex-col px-6 pt-4 pb-8"
        onSubmit={(e) => {
          e.preventDefault();
          onNext({
            placa: placa || "ABC1234",
            marca: marca || "Honda",
            modelo: modelo || "Civic",
          });
        }}
      >
        <div className="flex flex-col gap-4">
          <Input
            label="Placa"
            placeholder="Ingresa la placa sin espacios correctamente"
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
          />
          <Input
            label="Marca"
            placeholder="Ingresa la marca"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
          />
          <Input
            label="Modelo"
            placeholder="Ingresa el modelo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
          />
        </div>
        <div className="mt-auto flex flex-col gap-4 pt-8">
          <button type="submit" className={primaryBtn}>
            Registrar vehículo
          </button>
          <button type="button" onClick={onSkip} className={textLink}>
            Registrar vehículo en otro momento
          </button>
        </div>
      </form>
    </SignupShell>
  );
}

export function SignupPagoScreen({
  onBack,
  onNext,
  onSkip,
}: {
  onBack: () => void;
  onNext: () => void;
  onSkip: () => void;
}) {
  return (
    <SignupShell
      step={2}
      icon={Banknote}
      title="Mi método de pago"
      onBack={onBack}
    >
      <form
        className="flex flex-1 flex-col px-6 pt-4 pb-8"
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
      >
        <div className="flex flex-col gap-4">
          <Input
            label="Nombre"
            placeholder="Ingresa el nombre del titular de la cuenta"
          />
          <Input
            label="Apellidos"
            placeholder="Ingresa los apellidos del titular de la cuenta"
          />
          <Input
            label="Número de la tarjeta de crédito / débito"
            placeholder="Ingresa el número de la tarjeta"
            inputMode="numeric"
          />
          <div className="grid grid-cols-2 gap-6">
            <Input label="Fecha de vencimiento" placeholder="00/00" />
            <Input label="CVV" placeholder="---" inputMode="numeric" />
          </div>
        </div>
        <div className="mt-auto flex flex-col gap-4 pt-8">
          <button type="submit" className={primaryBtn}>
            Registrar tarjeta
          </button>
          <button type="button" onClick={onSkip} className={textLink}>
            Registrar tarjeta en otro momento
          </button>
        </div>
      </form>
    </SignupShell>
  );
}

export function SignupSaldoScreen({
  onBack,
  onDone,
}: {
  onBack: () => void;
  onDone: () => void;
}) {
  return (
    <SignupShell step={3} icon={DollarSign} title="Mi saldo" onBack={onBack}>
      <form
        className="flex flex-1 flex-col px-6 pt-4 pb-8"
        onSubmit={(e) => {
          e.preventDefault();
          onDone();
        }}
      >
        <Input
          label="Abonar saldo a mi cuenta"
          placeholder="Ingresa el monto a abonar"
          inputMode="decimal"
        />
        <div className="mt-auto flex flex-col gap-4 pt-8">
          <button type="submit" className={primaryBtn}>
            Recargar saldo
          </button>
          <button type="button" onClick={onDone} className={textLink}>
            Recargar saldo en otro momento
          </button>
        </div>
      </form>
    </SignupShell>
  );
}
