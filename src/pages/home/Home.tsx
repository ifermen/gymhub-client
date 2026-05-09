import { Main } from "../../components/Main/Main";
import { LineHorizontal } from "../../components/Line/LineHorizontal";
import DivContent from "../../components/Div/DivContent";
import { HeaderList } from "../../components/Header/HeaderList";
import { ItemSectionHome } from "../../components/Home/ItemSectionHome";
import { SectionHome } from "../../components/Home/SectionHome";

export function Home() {

  return (
    <Main>
      <DivContent>
        <HeaderList title="Bienvenido a GymHub" type="GymHub" />
        <LineHorizontal />
        <div className="sm:p-7 p-3 flex flex-col gap-3">
          <div className="flex flex-col w-full bg-background-950 border border-background-800 p-3 rounded-xl">
            <span className="sm:text-xl text-lg">Bienvenido a la aplicación de GymHub.<br />
              Gestiona clientes, clases y suscripciones de forma rápida y sencilla.
              Accede a todas las funcionalidades del gimnasio desde un único lugar.
              Optimiza la administración y mejora la experiencia de tus usuarios.
            </span>
          </div>
        </div>
        <LineHorizontal />
        <div className="p-7 w-full flex flex-col gap-3">
          <SectionHome title="Ofertas" description="Planes de suscripcion del gimnasio">
            <ItemSectionHome title="Listado de ofertas" canAdmin={true} canEmployee={false} canClient={false} />
            <ItemSectionHome title="Crear ofertas" canAdmin={true} canEmployee={false} canClient={false} />
            <ItemSectionHome title="Ver detalles" canAdmin={true} canEmployee={false} canClient={false} />
            <ItemSectionHome title="Editar ofertas" canAdmin={true} canEmployee={false} canClient={false} />
            <ItemSectionHome title="Activar / desactivar ofertas" canAdmin={true} canEmployee={false} canClient={false} />
          </SectionHome>
          <SectionHome title="Clientes" description="Gestión y seguimiento de clientes">
            <ItemSectionHome title="Listado de clientes" canAdmin={true} canEmployee={true} canClient={false} />
            <ItemSectionHome title="Crear clientes" canAdmin={true} canEmployee={true} canClient={false} />
            <ItemSectionHome title="Ver detalles" canAdmin={true} canEmployee={true} canClient={false} />
            <ItemSectionHome title="Editar cliente" canAdmin={true} canEmployee={true} canClient={false} />
            <ItemSectionHome title="Activar / desactivar cliente" canAdmin={true} canEmployee={true} canClient={false} />
            <ItemSectionHome title="Renovar suscripción" canAdmin={true} canEmployee={true} canClient={false} />
            <ItemSectionHome title="Asignar tabla de ejercicios" canAdmin={true} canEmployee={true} canClient={false} />
          </SectionHome>
          <SectionHome title="Empleados" description="Gestión del personal del gimnasio">
            <ItemSectionHome title="Listado de empleados" canAdmin={true} canEmployee={false} canClient={false} />
            <ItemSectionHome title="Crear empleados" canAdmin={true} canEmployee={false} canClient={false} />
            <ItemSectionHome title="Ver detalles" canAdmin={true} canEmployee={false} canClient={false} />
            <ItemSectionHome title="Editar empleado" canAdmin={true} canEmployee={false} canClient={false} />
            <ItemSectionHome title="Activar / desactivar empleado" canAdmin={true} canEmployee={false} canClient={false} />
          </SectionHome>
          <SectionHome title="Clases" description="Clases grupales y su gestión">
            <ItemSectionHome title="Listado de clases" canAdmin={true} canEmployee={true} canClient={true} />
            <ItemSectionHome title="Crear clases" canAdmin={true} canEmployee={false} canClient={false} />
            <ItemSectionHome title="Ver detalles" canAdmin={true} canEmployee={true} canClient={true} />
            <ItemSectionHome title="Editar clase" canAdmin={true} canEmployee={false} canClient={false} />
            <ItemSectionHome title="Activar / desactivar clase" canAdmin={true} canEmployee={false} canClient={false} />
            <ItemSectionHome title="Unirse / dejar clase" canAdmin={false} canEmployee={false} canClient={true} />
          </SectionHome>
          <SectionHome title="Tabla de ejercicios" description="Observar la tabla de ejercicios asignada">
            <ItemSectionHome title="Ver tabla de ejercicios" canAdmin={false} canEmployee={false} canClient={true} />
          </SectionHome>
          <SectionHome title="Incidencias" description="Reporte y seguimiento de problemas">
            <ItemSectionHome title="Listado de incidencias" canAdmin={true} canEmployee={true} canClient={true} />
            <ItemSectionHome title="Crear incidencias" canAdmin={true} canEmployee={true} canClient={true} />
            <ItemSectionHome title="Ver detalles" canAdmin={true} canEmployee={true} canClient={true} />
            <ItemSectionHome title="Editar incidencia" canAdmin={true} canEmployee={true} canClient={true} />
            <ItemSectionHome title="Activar / desactivar incidencia" canAdmin={true} canEmployee={true} canClient={true} />
            <ItemSectionHome title="Cambiar estado" canAdmin={true} canEmployee={true} canClient={false} />
          </SectionHome>
          <SectionHome title="Perfil Personal" description="Información y cuenta del usuario">
            <ItemSectionHome title="Ver perfil propio" canAdmin={true} canEmployee={true} canClient={true} />
            <ItemSectionHome title="Editar perfil" canAdmin={true} canEmployee={true} canClient={true} />
            <ItemSectionHome title="Ver suscripción activa" canAdmin={true} canEmployee={true} canClient={true} />
          </SectionHome>
        </div>
      </DivContent>
    </Main>
  )
}