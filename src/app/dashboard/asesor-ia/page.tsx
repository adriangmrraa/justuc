import AsesorIaChat from "@/components/features/asesor-ia-chat";

export default function AsesorIaPage() {
  // Demo case data — matches the Case model structure
  const caseData = {
    casos: [
      {
        id: "001",
        title: "Violencia de Género",
        lastUpdate: "hace 2 días",
        status: "En Audiencia",
        statusColor: "yellow",
        desc: "Denuncia por violencia de género en el ámbito familiar. Se encuentra en etapa de audiencia preliminar.",
        type: "Violencia de Género",
        location: "Juzgado de Familia N°2 - Tribunales de Tucumán",
        officer: "Dra. María González",
        institution: "Poder Judicial de Tucumán",
      },
      {
        id: "002",
        title: "Delito contra la Propiedad",
        lastUpdate: "hace 5 días",
        status: "Peritaje",
        statusColor: "blue",
        desc: "Hurto calificado. Se están realizando pericias forenses sobre las evidencias recolectadas.",
        type: "Delito Común",
        location: "Fiscalía de Instrucción N°3",
        officer: "Dr. Carlos Martínez",
        institution: "Ministerio Público Fiscal",
      },
      {
        id: "003",
        title: "Accidente de Tránsito",
        lastUpdate: "hace 1 semana",
        status: "Asignado a Fiscal",
        statusColor: "green",
        desc: "Accidente de tránsito con lesionados. Se asignó fiscal para investigar las circunstancias.",
        type: "Accidente de Tránsito",
        location: "Fiscalía de Instrucción N°5",
        officer: "Dra. Laura Rodríguez",
        institution: "Ministerio Público Fiscal",
      },
    ],
  };

  return (
    <div className="space-y-4 lg:space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-[#1E3A5F]">Asesor IA</h1>
        <p className="text-sm lg:text-base text-slate-500 mt-0.5 lg:mt-1">
          Consultá sobre tus causas judiciales
        </p>
      </div>

      <AsesorIaChat caseData={caseData} />
    </div>
  );
}
