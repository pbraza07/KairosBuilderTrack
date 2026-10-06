const STORE_KEY = 'kairos_portal_v1';
const SESSION_KEY = 'kairos_session_v1';

const LANG_KEY = 'kairos_language_v1';
let currentLanguage = (()=>{ try{return localStorage.getItem(LANG_KEY)==='pt'?'pt':'en';}catch{return 'en';} })();

const PT_UI = Object.freeze({
  'Investor Project Portal':'Portal do Projeto do Investidor',
  'For Such a Time as This':'Para um tempo como este',
  'Your home. Your investment. Completely visible.':'Sua casa. Seu investimento. Totalmente visível.',
  'A private, investor-friendly portal for construction progress, schedules, project photos, financial visibility, and milestone updates — all in one beautifully organized place.':'Um portal privado e intuitivo para acompanhar o andamento da obra, cronogramas, fotos do projeto, informações financeiras e marcos importantes — tudo organizado em um só lugar.',
  '24/7':'24/7',
  'secure project visibility':'visibilidade segura do projeto',
  '1 place':'1 lugar',
  'schedule, photos & spend':'cronograma, fotos e custos',
  'Private':'Privado',
  'project-by-project access':'acesso separado por projeto',
  'Investor Portal':'Portal do Investidor',
  'Welcome back':'Bem-vindo de volta',
  'Sign in to view your construction project or administer client accounts.':'Entre para acompanhar seu projeto de construção ou administrar contas de clientes.',
  'Demo access':'Acesso de demonstração',
  'Email address':'Endereço de e-mail',
  'Password':'Senha',
  'Sign in securely':'Entrar com segurança',
  'Signing in…':'Entrando…',
  'Shared login is enabled. Accounts created by the administrator can sign in from a phone, tablet, or another computer.':'O login compartilhado está ativado. Contas criadas pelo administrador podem entrar por celular, tablet ou outro computador.',
  'Overview':'Visão geral',
  'Schedule':'Cronograma',
  'Photos':'Fotos',
  'Investment':'Investimento',
  'Admin Center':'Central administrativa',
  'Project Portal':'Portal do Projeto',
  'Administrator':'Administrador',
  'Investor / Client':'Investidor / Cliente',
  'Sign out':'Sair',
  'Administrative portal':'Portal administrativo',
  'Private client portal':'Portal privado do cliente',
  'No project selected':'Nenhum projeto selecionado',
  'Notifications & approvals':'Notificações e aprovações',
  'No project is assigned to this account yet.':'Nenhum projeto foi atribuído a esta conta ainda.',
  'Project overview':'Visão geral do projeto',
  'A clear snapshot of schedule, construction progress, and investment activity.':'Uma visão clara do cronograma, do progresso da construção e da atividade de investimento.',
  'View latest photos':'Ver fotos recentes',
  'Open schedule':'Abrir cronograma',
  'Project location':'Local do projeto',
  'Construction start':'Início da construção',
  'Target completion':'Previsão de conclusão',
  'Last project update':'Última atualização do projeto',
  'Project completion':'Conclusão do projeto',
  'Invested to date':'Investido até o momento',
  'Remaining budget':'Orçamento restante',
  'Current / next phase':'Fase atual / próxima',
  'Project Complete':'Projeto concluído',
  'All milestones complete':'Todos os marcos concluídos',
  'Construction phases':'Fases da construção',
  'Latest project photos':'Fotos mais recentes do projeto',
  'View all':'Ver todas',
  'No photos uploaded yet.':'Nenhuma foto enviada ainda.',
  'Complete':'Concluída',
  'In progress':'Em andamento',
  'Past due':'Atrasada',
  'Upcoming':'Próxima',
  'Construction schedule':'Cronograma da construção',
  'Follow every construction phase and planned work from start through turnover.':'Acompanhe cada fase da construção e todo o trabalho planejado, do início à entrega.',
  'Add phase':'Adicionar fase',
  'Import Excel':'Importar Excel',
  'Gantt':'Gantt',
  'List':'Lista',
  'No dated construction phases yet. Import a project schedule or add phases manually.':'Ainda não há fases de construção com datas. Importe um cronograma do projeto ou adicione as fases manualmente.',
  'Phases are automatically grouped by their broader construction scope. Admins can change the category on any individual phase.':'As fases são agrupadas automaticamente conforme o escopo mais amplo da construção. O administrador pode alterar a categoria de qualquer fase individualmente.',
  'Phase / trade':'Fase / especialidade',
  'Phases are automatically grouped into the broader category that best matches the work.':'As fases são agrupadas automaticamente na categoria geral que melhor corresponde ao trabalho.',
  'Code':'Código',
  'Phase':'Fase',
  'Start':'Início',
  'Finish':'Término',
  'End':'Término',
  'Days':'Dias',
  'Progress':'Progresso',
  'Status':'Status',
  'Actions':'Ações',
  'Edit phase':'Editar fase',
  'Edit':'Editar',
  'Delete phase':'Excluir fase',
  'Project photos':'Fotos do projeto',
  'Progress documentation organized by project and phase. Select any photo to enlarge it, move through the gallery, or download a copy.':'Documentação do progresso organizada por projeto e fase. Selecione qualquer foto para ampliá-la, navegar pela galeria ou baixar uma cópia.',
  'Add photo':'Adicionar foto',
  'No photos have been uploaded for this project yet.':'Nenhuma foto foi enviada para este projeto ainda.',
  'Project update':'Atualização do projeto',
  'Click to enlarge':'Clique para ampliar',
  'Download photo':'Baixar foto',
  'Edit photo':'Editar foto',
  'Delete photo':'Excluir foto',
  'Close':'Fechar',
  'Previous photo':'Foto anterior',
  'Next photo':'Próxima foto',
  'Download':'Baixar',
  'Investment & budget':'Investimento e orçamento',
  'Investor-friendly visibility into budget utilization, project costs, approvals, and expense history.':'Visibilidade clara para o investidor sobre utilização do orçamento, custos do projeto, aprovações e histórico de despesas.',
  'Add expense':'Adicionar despesa',
  'Approved project budget':'Orçamento aprovado do projeto',
  'Current authorized budget':'Orçamento autorizado atual',
  'new expenses update this automatically':'novas despesas atualizam isso automaticamente',
  'Remaining capital':'Capital restante',
  'Based on current budget':'Com base no orçamento atual',
  'Expenses awaiting your approval':'Despesas aguardando sua aprovação',
  'Expenses awaiting client approval':'Despesas aguardando aprovação do cliente',
  'all decisions are recorded in project history':'todas as decisões são registradas no histórico do projeto',
  'No vendor entered':'Nenhum fornecedor informado',
  'Not approve':'Não aprovar',
  'Approve':'Aprovar',
  'Waiting':'Aguardando',
  'Capital utilization':'Utilização de capital',
  'budget utilized':'orçamento utilizado',
  'Spend by category':'Gastos por categoria',
  'No expenses entered yet.':'Nenhuma despesa registrada ainda.',
  'Expense ledger':'Registro de despesas',
  'Edit transactions and monitor client decisions':'Edite transações e acompanhe as decisões do cliente',
  'Review project expenses and approval status':'Revise as despesas do projeto e o status de aprovação',
  'Expense approval history':'Histórico de aprovação de despesas',
  'Permanent in-app record of requests, edits, approvals, rejections, and deletions':'Registro permanente no portal de solicitações, edições, aprovações, recusas e exclusões',
  'Investor note':'Nota ao investidor',
  'New expenses are immediately reflected in Approved Project Budget and Invested to Date as requested. Client approval or non-approval is tracked separately as an acknowledgement/decision and does not erase the recorded project cost.':'Novas despesas são refletidas imediatamente no Orçamento Aprovado do Projeto e no Investido até o Momento. A aprovação ou não aprovação do cliente é registrada separadamente como confirmação/decisão e não elimina o custo registrado do projeto.',
  'Date':'Data',
  'Category':'Categoria',
  'Vendor / payee':'Fornecedor / favorecido',
  'Notes':'Observações',
  'Amount':'Valor',
  'Client approval':'Aprovação do cliente',
  'Pending client approval':'Aguardando aprovação do cliente',
  'Approved':'Aprovada',
  'Not approved':'Não aprovada',
  'No client approval required':'Aprovação do cliente não necessária',
  'No expenses have been added.':'Nenhuma despesa foi adicionada.',
  'Recent expense activity':'Atividade recente de despesas',
  'No expense approvals are waiting.':'Nenhuma aprovação de despesa está pendente.',
  'No expense history yet.':'Ainda não há histórico de despesas.',
  'No expense history has been recorded yet.':'Ainda não há histórico de despesas registrado.',
  'Approve expense':'Aprovar despesa',
  'Do not approve expense':'Não aprovar despesa',
  'Comment (optional)':'Comentário (opcional)',
  'Add a note for the builder or project record':'Adicione uma observação para o construtor ou para o registro do projeto',
  'Cancel':'Cancelar',
  'Approve expense':'Aprovar despesa',
  'Expense activity':'Atividade de despesa',
  'System':'Sistema',
  'Admin center':'Central administrativa',
  'Full editing control for client access, projects, construction phases, photos, expenses, budgets, and schedule imports.':'Controle completo para editar acesso de clientes, projetos, fases de construção, fotos, despesas, orçamentos e importações de cronograma.',
  'New client':'Novo cliente',
  'New project':'Novo projeto',
  'Client accounts':'Contas de clientes',
  'Active projects':'Projetos ativos',
  'Portfolio budget':'Orçamento do portfólio',
  'Capital deployed':'Capital investido',
  'Projects':'Projetos',
  'Select to manage':'Selecione para gerenciar',
  'No projects yet.':'Ainda não há projetos.',
  'Client login accounts':'Contas de acesso dos clientes',
  'Edit credentials and project access assignments':'Edite credenciais e permissões de acesso aos projetos',
  'Client':'Cliente',
  'Email':'E-mail',
  'Assigned project(s)':'Projeto(s) atribuído(s)',
  'Role':'Função',
  'None':'Nenhum',
  'No client accounts yet.':'Ainda não há contas de clientes.',
  'Create a project to begin.':'Crie um projeto para começar.',
  'Edit project':'Editar projeto',
  'Delete':'Excluir',
  'Assigned client':'Cliente atribuído',
  'Unassigned':'Não atribuído',
  'Budget':'Orçamento',
  'Completion':'Conclusão',
  'Excel construction schedule':'Cronograma de construção em Excel',
  'No spreadsheet has been imported for this project yet.':'Nenhuma planilha foi importada para este projeto ainda.',
  "Upload this project's spreadsheet to replace or merge phases, dates, completion flags, duration, and project schedule dates.":'Envie a planilha deste projeto para substituir ou mesclar fases, datas, indicadores de conclusão, duração e datas do cronograma.',
  'Update from Excel':'Atualizar pelo Excel',
  'Template':'Modelo',
  'Undo last import':'Desfazer última importação',
  'Project phases':'Fases do projeto',
  'Project photos':'Fotos do projeto',
  'Storage':'Armazenamento',
  'Legacy image':'Imagem anterior',
  'Project expenses':'Despesas do projeto',
  'Edit construction phase':'Editar fase da construção',
  'Delete construction phase':'Excluir fase da construção',
  'Create client login':'Criar acesso de cliente',
  'Edit client login':'Editar acesso do cliente',
  'Client / investor name':'Nome do cliente / investidor',
  'New password (optional)':'Nova senha (opcional)',
  'Temporary password':'Senha temporária',
  'Leave blank to keep current password':'Deixe em branco para manter a senha atual',
  'Project access':'Acesso aos projetos',
  'Create a project first, then assign access here.':'Crie um projeto primeiro e depois atribua o acesso aqui.',
  'A client only sees projects checked here. Assigning a project to this client makes them the primary client for that project.':'O cliente vê apenas os projetos marcados aqui. Ao atribuir um projeto a este cliente, ele se torna o cliente principal desse projeto.',
  'Save client':'Salvar cliente',
  'Create account':'Criar conta',
  'Edit project':'Editar projeto',
  'Create project':'Criar projeto',
  'Project name':'Nome do projeto',
  'Address':'Endereço',
  'Primary client':'Cliente principal',
  'Project status':'Status do projeto',
  'Start date':'Data de início',
  'Target completion date':'Data prevista de conclusão',
  'Approved budget':'Orçamento aprovado',
  'Invested to date':'Investido até o momento',
  'Completion %':'Conclusão %',
  'Project summary':'Resumo do projeto',
  'Save project':'Salvar projeto',
  'Add construction phase':'Adicionar fase da construção',
  'Edit construction phase':'Editar fase da construção',
  'Phase code':'Código da fase',
  'Phase name':'Nome da fase',
  'Broader construction category':'Categoria geral da construção',
  'Auto-detect from phase name':'Detectar automaticamente pelo nome da fase',
  'Start date':'Data de início',
  'Finish date':'Data de término',
  'Duration (days)':'Duração (dias)',
  'Progress %':'Progresso %',
  'Trade / responsible party':'Especialidade / responsável',
  'Optional':'Opcional',
  'Phase notes':'Observações da fase',
  'Optional investor-facing update or admin note':'Atualização opcional para o investidor ou observação administrativa',
  'Save phase changes':'Salvar alterações da fase',
  'Add project photo':'Adicionar foto do projeto',
  'Edit project photo':'Editar foto do projeto',
  'Current image':'Imagem atual',
  'Photo title':'Título da foto',
  'Project phase':'Fase do projeto',
  'Replace image (optional)':'Substituir imagem (opcional)',
  'Image file':'Arquivo de imagem',
  'Leave empty to keep the current image.':'Deixe em branco para manter a imagem atual.',
  'Select a photo to see its storage optimization.':'Selecione uma foto para ver a otimização de armazenamento.',
  'No replacement selected; the existing image will be kept.':'Nenhuma substituição selecionada; a imagem atual será mantida.',
  'Save photo':'Salvar foto',
  'Optimize & upload photo':'Otimizar e enviar foto',
  'Edit project expense':'Editar despesa do projeto',
  'Add project expense':'Adicionar despesa do projeto',
  'Automatic financial update + client approval':'Atualização financeira automática + aprovação do cliente',
  'Category':'Categoria',
  'Amount':'Valor',
  'Vendor / payee':'Fornecedor / favorecido',
  'Contractor or supplier':'Empreiteiro ou fornecedor',
  'Notes':'Observações',
  'Invoice, draw, scope, or payment note':'Fatura, liberação, escopo ou observação de pagamento',
  'Save expense & request approval':'Salvar despesa e solicitar aprovação',
  'Add expense & request approval':'Adicionar despesa e solicitar aprovação',
  'Import Excel schedule':'Importar cronograma do Excel',
  "Update this project's construction phases from Excel":'Atualize as fases de construção deste projeto pelo Excel',
  'Excel schedule file':'Arquivo do cronograma em Excel',
  'Choose .xlsx or .xls file':'Escolha um arquivo .xlsx ou .xls',
  'Expected columns: ID #, Title, Complete, Duration, Start, End':'Colunas esperadas: ID #, Title, Complete, Duration, Start, End',
  'Import behavior':'Comportamento da importação',
  'Replace schedule with spreadsheet':'Substituir o cronograma pela planilha',
  'Merge / update matching phase codes':'Mesclar / atualizar códigos de fases correspondentes',
  'Update project start, target completion, and completion % from spreadsheet':'Atualizar início do projeto, conclusão prevista e % de conclusão pela planilha',
  'How it works':'Como funciona',
  'Choose a spreadsheet to preview the changes before importing.':'Escolha uma planilha para visualizar as alterações antes de importar.',
  'Import schedule':'Importar cronograma',
  'phases found':'fases encontradas',
  'marked complete':'marcadas como concluídas',
  'schedule completion':'conclusão do cronograma',
  'first phase':'primeira fase',
  'last phase':'última fase',
  'No schedule table was found. The spreadsheet needs columns for Title, Start, and End. The Kairos template is supported automatically.':'Nenhuma tabela de cronograma foi encontrada. A planilha precisa ter colunas Title, Start e End. O modelo Kairos é reconhecido automaticamente.',
  'The schedule sheet was found, but no rows had both a valid Start and End date.':'A planilha de cronograma foi encontrada, mas nenhuma linha tinha datas válidas de início e término.',
  'Excel parser could not load. Check the internet connection and try again.':'O leitor de Excel não pôde ser carregado. Verifique a conexão com a internet e tente novamente.',
  'Restore the project schedule to the version from before the last Excel import?':'Restaurar o cronograma do projeto para a versão anterior à última importação do Excel?',
  'Notifications & approvals':'Notificações e aprovações',
  'Awaiting client':'Aguardando cliente',
  'Expense approved':'Despesa aprovada',
  'Expense marked not approved':'Despesa marcada como não aprovada',
  'Unable to record decision':'Não foi possível registrar a decisão',
  'Phase deleted':'Fase excluída',
  'Photo deleted':'Foto excluída',
  'Expense deleted; budget and invested totals adjusted':'Despesa excluída; orçamento e total investido ajustados',
  'Client login deleted':'Acesso do cliente excluído',
  'Project deleted':'Projeto excluído',
  'Email already exists':'Este e-mail já existe',
  'Previous project schedule restored':'Cronograma anterior do projeto restaurado',
  'Finish date cannot be before the start date':'A data de término não pode ser anterior à data de início',
  'Phase updated':'Fase atualizada',
  'Phase added':'Fase adicionada',
  'Photo updated and optimized':'Foto atualizada e otimizada',
  'Photo optimized and uploaded':'Foto otimizada e enviada',
  'Expense updated; client approval requested':'Despesa atualizada; aprovação do cliente solicitada',
  'Expense added; client notified for approval':'Despesa adicionada; cliente notificado para aprovação',
  'Expense updated':'Despesa atualizada',
  'Expense added':'Despesa adicionada',
  'Unable to upload photo':'Não foi possível enviar a foto',
  'Unable to optimize this photo.':'Não foi possível otimizar esta foto.',
  'Choose a photo to upload.':'Escolha uma foto para enviar.',
  'Please select an image file.':'Selecione um arquivo de imagem.',
  'Unable to read optimized image.':'Não foi possível ler a imagem otimizada.',
  'This photo format could not be opened by the browser. Please use JPEG, PNG, or WebP.':'Este formato de foto não pôde ser aberto pelo navegador. Use JPEG, PNG ou WebP.',
  'The selected photo has invalid dimensions.':'A foto selecionada tem dimensões inválidas.',
  'Preparing photo…':'Preparando foto…',
  'Saved on this device, but cloud sync failed. Please check your connection.':'Salvo neste dispositivo, mas a sincronização com a nuvem falhou. Verifique sua conexão.',
  'Cloud sync failed. Your server data was not changed.':'A sincronização com a nuvem falhou. Os dados do servidor não foram alterados.',
  'Signed in, but the old browser data could not be migrated to shared storage.':'Login realizado, mas os dados antigos do navegador não puderam ser migrados para o armazenamento compartilhado.',
  'Pre-Construction':'Pré-construção',
  'Punch List':'Lista de pendências',
  'Project address / location':'Endereço / localização do projeto',
  'Client account':'Conta do cliente',
  'Target completion':'Previsão de conclusão',
  'Total budget':'Orçamento total',
  'Save changes':'Salvar alterações',
  'Project updated':'Projeto atualizado',
  'Project created':'Projeto criado',
  'Client updated':'Cliente atualizado',
  'Client account created':'Conta do cliente criada',
  'Phase / trade name':'Nome da fase / especialidade',
  'Leave on Auto-detect to categorize from the phase name. You can override it for any individual phase.':'Mantenha em Detecção automática para categorizar pelo nome da fase. Você pode substituir a categoria em qualquer fase individual.',
  'Calculated from dates':'Calculado pelas datas',
  'Responsible trade / contractor':'Especialidade / empreiteiro responsável',
  'Changes made here update this individual phase only and sync to the assigned client.':'As alterações feitas aqui atualizam somente esta fase e são sincronizadas com o cliente atribuído.',
  'Add a single phase manually. Excel imports can still replace or merge the full schedule later.':'Adicione uma fase manualmente. As importações do Excel ainda podem substituir ou mesclar o cronograma completo depois.',
  'Framing, HVAC, Exterior…':'Estrutura, HVAC, Exterior…',
  'Kairos automatically resizes and compresses each upload to WebP when supported. The target is about 350 KB per photo, with a 1,600 px maximum edge and a quality floor designed to keep construction details clear.':'O Kairos redimensiona e comprime automaticamente cada envio para WebP quando compatível. A meta é cerca de 350 KB por foto, com dimensão máxima de 1.600 px e um limite de qualidade pensado para manter os detalhes da construção nítidos.',
  'Leave empty to keep the current image. Kairos automatically resizes and compresses each upload to WebP when supported. The target is about 350 KB per photo, with a 1,600 px maximum edge and a quality floor designed to keep construction details clear.':'Deixe em branco para manter a imagem atual. O Kairos redimensiona e comprime automaticamente cada envio para WebP quando compatível. A meta é cerca de 350 KB por foto, com dimensão máxima de 1.600 px e um limite de qualidade pensado para manter os detalhes da construção nítidos.',
  'Windows / Exterior':'Janelas / Exterior',
  'Changing this amount adjusts both':'Alterar este valor ajusta',
  'Adding this expense increases both':'Adicionar esta despesa aumenta',
  'and':'e',
  'by the amount difference. The assigned client will receive a portal notification to Approve or Not approve this expense. Editing a previously decided expense requests approval again.':'pela diferença do valor. O cliente atribuído receberá uma notificação no portal para Aprovar ou Não aprovar esta despesa. Editar uma despesa já decidida solicitará aprovação novamente.',
  'The assigned client will receive a portal notification to Approve or Not approve this expense. Editing a previously decided expense requests approval again.':'O cliente atribuído receberá uma notificação no portal para Aprovar ou Não aprovar esta despesa. Editar uma despesa já decidida solicitará aprovação novamente.',
  'Assign a client to this project to enable approval notifications.':'Atribua um cliente a este projeto para ativar notificações de aprovação.',
  'Select the spreadsheet belonging to':'Selecione a planilha pertencente a',
  'The importer finds the schedule headers automatically, including the format in your provided template.':'O importador identifica automaticamente os cabeçalhos do cronograma, incluindo o formato do modelo fornecido.',
  'The Title prefix such as':'O prefixo do Title, como',
  'becomes phase code':'torna-se o código da fase',
  'Each row is also auto-assigned to the broader construction category that best matches the work. Complete = TRUE becomes 100% complete. Incomplete tasks are classified as upcoming, in progress, or past due from their dates.':'Cada linha também é atribuída automaticamente à categoria geral da construção que melhor corresponde ao trabalho. Complete = TRUE torna-se 100% concluída. Tarefas incompletas são classificadas como próximas, em andamento ou atrasadas conforme as datas.',
  'Unable to read this spreadsheet.':'Não foi possível ler esta planilha.',
  'Unable to sign in':'Não foi possível entrar',
  'Expense added — approval requested':'Despesa adicionada — aprovação solicitada',
  'Expense updated — approval requested':'Despesa atualizada — aprovação solicitada',
  'Expense deleted':'Despesa excluída',
  'New expense requires approval':'Nova despesa requer aprovação',
  'Expense updated — approval requested':'Despesa atualizada — aprovação solicitada',
  'Language':'Idioma',
  'English':'Inglês',
  'A modern Florida residence progressing through exterior enclosure and rough-in trades.':'Uma residência moderna na Flórida avançando pela etapa de fechamento externo e instalações preliminares.',
  'Pre-construction planning, procurement, and permitting for a clean contemporary single-family home.':'Planejamento de pré-construção, compras e licenciamento para uma residência unifamiliar contemporânea.',
  'In Construction':'Em construção',
  'Planning':'Planejamento',
  'Completed':'Concluído',
  'On Hold':'Em espera',
  'Pre-Construction, Design & Permitting':'Pré-construção, projeto e licenciamento',
  'Site Preparation & Temporary Services':'Preparação do terreno e serviços temporários',
  'Foundation & Underground':'Fundação e infraestrutura subterrânea',
  'Structure & Framing':'Estrutura e armação',
  'Building Envelope & Exterior':'Envoltória da edificação e exterior',
  'MEP Rough-In & Utilities':'Instalações MEP e utilidades',
  'Insulation & Drywall':'Isolamento e drywall',
  'Septic, Well & Water Systems':'Sistemas sépticos, poço e água',
  'Interior Finishes':'Acabamentos internos',
  'Site Improvements & Landscaping':'Melhorias externas e paisagismo',
  'Testing, Startup & Punch':'Testes, ativação e pendências',
  'Final Inspections & Turnover':'Inspeções finais e entrega',
  'Other / General':'Outros / Geral'

  ,'Current authorized budget · new expenses update this automatically':'Orçamento autorizado atual · novas despesas atualizam este valor automaticamente'
  ,'No construction phases yet.':'Ainda não há fases de construção.'
  ,'Photo':'Foto'
  ,'Title':'Título'
  ,'Dates':'Datas'
  ,'Approved Project Budget':'Orçamento Aprovado do Projeto'
  ,'Invested to Date':'Investido até o Momento'
  ,'Edit client':'Editar cliente'
  ,'Delete client':'Excluir cliente'
  ,'No project':'Nenhum projeto'
  ,'Synced from':'Sincronizado de'
  ,'on':'em'
  ,'schedule items':'itens do cronograma'
  ,'uploaded photos':'fotos enviadas'
  ,'entries':'lançamentos'
  ,'complete':'concluído'
  ,'Project photo':'Foto do projeto'
  ,'project photo':'foto do projeto'
  ,'Expense':'Despesa'
  ,'Edit expense':'Editar despesa'
  ,'Delete expense':'Excluir despesa'
  ,'Current authorized budget · new expenses update this automatically':'Orçamento autorizado atual · novas despesas atualizam este valor automaticamente'
});



// Bilingual display layer for construction data imported from project spreadsheets.
// Stored project data is never rewritten when a user changes languages; only the display changes.
const PT_PHASE_NAMES = Object.freeze({
  'Architectural':'Projeto arquitetônico',
  'Engineering Design / Load Calcs':'Projeto de engenharia / cálculos de carga',
  'Survey - Lot grading Plan and Topo':'Levantamento topográfico - plano de nivelamento do lote e topografia',
  'Print Plans and get stamp with Enginner':'Imprimir plantas e obter carimbo do engenheiro',
  'Permits':'Licenças',
  'Utilities - Request Electrical Connection':'Utilidades - solicitar ligação elétrica',
  'Utilities - Request Water Connection':'Utilidades - solicitar ligação de água',
  'Boundary Stake Out':'Locação dos limites do terreno',
  'Cleaning Lot':'Limpeza do terreno',
  'Rough Stake Out':'Locação preliminar da obra',
  'Fill Dirt / Pad':'Aterro / preparação do platô',
  'House Stake Out':'Locação da casa',
  'Portable Toilet':'Banheiro portátil',
  'Prepair the rail':'Preparar gabarito / guia',
  'Compaction test':'Teste de compactação',
  'Plumbing, Electrical & Mech Underground':'Instalações subterrâneas hidráulicas, elétricas e mecânicas',
  'Sewer Connection - Utility Water Company':'Ligação de esgoto - concessionária de água',
  'Underground Inspection':'Inspeção das instalações subterrâneas',
  'Water line inspection':'Inspeção da linha de água',
  'Sewer Tap Inspection':'Inspeção da conexão de esgoto',
  'Prepair Slab':'Preparar laje',
  'Slab Inspection':'Inspeção da laje',
  'Driveway Preliminary Inspection':'Inspeção preliminar da entrada de veículos',
  'Pouring Slab':'Concretagem da laje',
  'Dumpster Delivery':'Entrega da caçamba',
  'Exterior Masonry':'Alvenaria externa',
  'Water Meter Set up':'Instalação do hidrômetro',
  'Truss Layout':'Marcação das tesouras do telhado',
  'Lintel Inspection':'Inspeção das vergas',
  'Meter Can Installation':'Instalação da caixa do medidor elétrico',
  'Pouring Lintels':'Concretagem das vergas',
  'TUG Inspection':'Inspeção TUG',
  'Stucco Grading':'Preparação do terreno para estuque',
  'Prepair Trusses to Fly':'Preparar tesouras para içamento',
  'Framing':'Estrutura de madeira',
  'Sheathing':'Fechamento estrutural',
  'Exterior Doors':'Portas externas',
  'Install Windows':'Instalação das janelas',
  'Plumbing Rough In':'Hidráulica bruta',
  'Sheathing Inspection':'Inspeção do fechamento estrutural',
  'Apply Underlayment':'Aplicação da manta / subcobertura',
  'Wall Sheathing / Sub-siding Inspection':'Inspeção do fechamento de paredes / base do revestimento',
  '2º Plumbing Rough In Inspection':'2ª inspeção da hidráulica bruta',
  'HVAC Rough In':'HVAC bruto',
  'Electrical Rough-In':'Elétrica bruta',
  'Dry in flash Inspection':'Inspeção de impermeabilização / flashing',
  'HVAC Rough in Inspection':'Inspeção do HVAC bruto',
  'Electrical Rough in Inspection':'Inspeção da elétrica bruta',
  'Install Shingles':'Instalação das telhas',
  'Framing / Combined Inspection':'Inspeção da estrutura / inspeção combinada',
  'Lathe':'Tela para estuque',
  'Lathe Inspection':'Inspeção da tela para estuque',
  'Insulation Install':'Instalação do isolamento',
  'Insullation Inspection':'Inspeção do isolamento',
  'Stucco':'Estuque',
  'Drywall':'Drywall',
  'Septic Tank Installation':'Instalação da fossa séptica',
  'Hook up':'Conexão',
  'Hook up Inspection - Septic':'Inspeção da conexão - sistema séptico',
  'DOH (Septic) Inspection':'Inspeção do DOH - sistema séptico',
  'Painting-Exterior':'Pintura externa',
  'Painting-Interior':'Pintura interna',
  'Garage Door Installation':'Instalação da porta da garagem',
  'Clean / Prime Flooring and Wet Walls':'Limpeza / preparação do piso e áreas molhadas',
  'Tile Flooring - Bathroom - Installation':'Instalação de piso cerâmico - banheiro',
  'Tile Flooring Grout':'Rejunte do piso cerâmico',
  'Tile Wall (Bathrooms)':'Revestimento cerâmico de parede - banheiros',
  'Well Installation':'Instalação do poço',
  'Soffit':'Forro de beiral',
  'Soffit - Inspection':'Inspeção do forro de beiral',
  'Tile Wall Grout (Bathrooms)':'Rejunte do revestimento de parede - banheiros',
  'Tile / Vinyl - Other rooms - Installation':'Instalação de piso cerâmico / vinílico - demais ambientes',
  'Cabinet Install':'Instalação dos armários',
  'HVAC Finish':'Acabamento do HVAC',
  'Light Fixture Install':'Instalação das luminárias',
  'Driveway Cut / Install Culvert Pipe':'Corte da entrada / instalação do tubo de drenagem',
  'Driveway Formboard':'Formas da entrada de veículos',
  'Countertop Install':'Instalação das bancadas',
  'Driveway - Pre-Pour Inspection':'Entrada de veículos - inspeção antes da concretagem',
  'Door, Baseboards and Casings':'Portas, rodapés e guarnições',
  'Plumbing Fixtures Install':'Instalação dos aparelhos hidráulicos',
  'Mirrors / Blinds / Shelves / Numbers':'Espelhos / persianas / prateleiras / números',
  'Driveway - Pouring':'Concretagem da entrada de veículos',
  'Pre-Power Inspection':'Inspeção pré-energização',
  'Water Hook up - Meter or Well':'Ligação de água - hidrômetro ou poço',
  'Remove Dumpster from site':'Retirar caçamba do terreno',
  'Remove Portable Toilet':'Retirar banheiro portátil',
  'Final Grading':'Nivelamento final do terreno',
  'Asphalt Repair':'Reparo do asfalto',
  'Site Drainage Inspection':'Inspeção da drenagem do terreno',
  'Install Mailbox':'Instalação da caixa de correio',
  'Install Clean Out Pad':'Instalação da base do cleanout',
  'Electrical Meter Set up':'Instalação do medidor elétrico',
  'Electrical Starting':'Ativação elétrica',
  'Sod':'Grama em placas',
  'Blown Door Test':'Teste Blower Door',
  'HVAC Starting':'Partida do HVAC',
  'Termite Bait':'Iscas contra cupins',
  'Utility Inspection - Final Building':'Inspeção final de utilidades da edificação',
  'Blown Insulation':'Isolamento soprado',
  'Rough Punchout':'Correções preliminares / punch list',
  'Driveway - Final Inspection':'Entrada de veículos - inspeção final',
  'Painting/Caulking - Door/Baseboards/Casings':'Pintura / calafetação - portas, rodapés e guarnições',
  'Final Painting':'Pintura final',
  'Painting Front Door':'Pintura da porta de entrada',
  'Door Knobs and Door Stop':'Maçanetas e batentes de porta',
  'Final Cleaning':'Limpeza final',
  'Appliance Installation':'Instalação dos eletrodomésticos',
  'Electrical Final Inspection':'Inspeção elétrica final',
  'Mechanical Final Inspection':'Inspeção mecânica final',
  'Plumbing Final Inspection':'Inspeção hidráulica final',
  'Building Final Inspection':'Inspeção final da edificação',
  // Seed/demo and common phase names
  'Permitting & Mobilization':'Licenciamento e mobilização',
  'Sitework & Foundation':'Terraplenagem e fundação',
  'Framing & Structural':'Estrutura e framing',
  'Electrical Rough-In':'Elétrica bruta',
  'HVAC Rough-In':'HVAC bruto',
  'Insulation & Drywall':'Isolamento e drywall',
  'Interior Finishes':'Acabamentos internos',
  'Finals & Turnover':'Etapas finais e entrega',
  'Design & Engineering':'Projeto e engenharia',
  'Interiors & Finals':'Interiores e etapas finais',
  'Pre-Construction':'Pré-construção',
  'Foundation Complete':'Fundação concluída',
  'First-Floor Framing':'Estrutura do primeiro pavimento',
  'Roof Trusses Set':'Tesouras do telhado instaladas',
  'Lot Survey & Stakeout':'Levantamento e locação do lote'
});

const PT_EXPENSE_CATEGORIES = Object.freeze({
  'Land / Acquisition':'Terreno / aquisição',
  'Foundation':'Fundação',
  'Framing':'Estrutura',
  'MEP Rough-In':'Instalações MEP brutas',
  'Windows / Exterior':'Janelas / exterior',
  'Design & Engineering':'Projeto e engenharia',
  'Permits / Fees':'Licenças / taxas',
  'Electrical':'Elétrica',
  'Plumbing':'Hidráulica',
  'HVAC':'HVAC',
  'Roofing':'Cobertura',
  'Drywall':'Drywall',
  'Painting':'Pintura',
  'Cabinets':'Armários',
  'Flooring':'Pisos',
  'Landscaping':'Paisagismo',
  'Other':'Outros'
});

const PT_PHASE_PHRASES = [
  ['Final Inspection','Inspeção final'],['Rough In Inspection','Inspeção da instalação bruta'],['Rough-In Inspection','Inspeção da instalação bruta'],
  ['Pre-Pour Inspection','Inspeção antes da concretagem'],['Site Drainage','Drenagem do terreno'],['Driveway','Entrada de veículos'],
  ['Electrical','Elétrica'],['Plumbing','Hidráulica'],['Mechanical','Mecânica'],['Inspection','Inspeção'],['Installation','Instalação'],
  ['Install','Instalação'],['Painting','Pintura'],['Final','Final'],['Exterior','Externo'],['Interior','Interno'],['Cleaning','Limpeza'],
  ['Foundation','Fundação'],['Framing','Estrutura'],['Roof','Telhado'],['Windows','Janelas'],['Doors','Portas'],['Door','Porta'],
  ['Utilities','Utilidades'],['Water','Água'],['Sewer','Esgoto'],['Grading','Nivelamento'],['Survey','Levantamento'],['Permits','Licenças'],
  ['Concrete','Concreto'],['Slab','Laje'],['Insulation','Isolamento'],['Cabinet','Armário'],['Countertop','Bancada'],['Flooring','Piso'],
  ['Appliance','Eletrodoméstico'],['Light Fixture','Luminária'],['Meter','Medidor'],['Mailbox','Caixa de correio'],['Test','Teste'],
  ['Starting','Ativação'],['Complete','Concluído']
].sort((a,b)=>b[0].length-a[0].length);

function localizedPhaseName(name){
  const raw=String(name??'').trim();
  if(currentLanguage!=='pt' || !raw) return raw;
  if(PT_PHASE_NAMES[raw]) return PT_PHASE_NAMES[raw];
  let out=raw;
  for(const [en,pt] of PT_PHASE_PHRASES){ out=out.replace(new RegExp(`\\b${en.replace(/[.*+?^${}()|[\\]\\]/g,'\\$&')}\\b`,'gi'),pt); }
  return out;
}
function localizedExpenseCategory(value){
  const raw=String(value??'').trim();
  return currentLanguage==='pt'?(PT_EXPENSE_CATEGORIES[raw]||raw):raw;
}
function localizedPhotoPhase(value){
  const raw=String(value??'').trim();
  return localizedPhaseName(raw);
}

const PT_DYNAMIC = [
  [/^(\d+) of (\d+) completed$/,'$1 de $2 concluídas'],
  [/^(\d+) construction categories$/,'$1 categorias de construção'],
  [/^(\d+) phase$/,'$1 fase'],
  [/^(\d+) phases$/,'$1 fases'],
  [/^(\d+) pending$/,'$1 pendente(s)'],
  [/^(\d+) pending approval$/,'$1 aprovação pendente'],
  [/^(\d+) pending approvals$/,'$1 aprovações pendentes'],
  [/^(\d+) pending approval · all decisions are recorded in project history$/,'$1 aprovação pendente · todas as decisões são registradas no histórico do projeto'],
  [/^(\d+) pending approvals · all decisions are recorded in project history$/,'$1 aprovações pendentes · todas as decisões são registradas no histórico do projeto'],
  [/^(\d+)% of project budget$/,'$1% do orçamento do projeto'],
  [/^(\d+)% utilized$/,'$1% utilizado'],
  [/^Total budget (.+)$/,'Orçamento total $1'],
  [/^Updated (.+)$/,'Atualizado em $1'],
  [/^requested (.+)$/,'solicitado em $1'],
  [/^Requested (.+)$/,'Solicitado em $1'],
  [/^Last Excel sync:$/,'Última sincronização com Excel:'],
  [/^Schedule synced (.+) from Excel$/,'Cronograma sincronizado em $1 pelo Excel'],
  [/^ · (\d+) phases$/,' · $1 fases'],
  [/^(\d+) schedule items · each phase is assigned to a broader construction category$/,'$1 itens do cronograma · cada fase é atribuída a uma categoria geral da construção'],
  [/^(\d+) uploaded photos · edit title, date, phase, or replace the image$/,'$1 fotos enviadas · edite título, data, fase ou substitua a imagem'],
  [/^(\d+) entries · invested total (.+)$/,'$1 lançamentos · total investido $2'],
  [/^Synced from (.+) on (.+) · (\d+) phases$/,'Sincronizado de $1 em $2 · $3 fases'],
  [/^(\d+) row was skipped because a valid Start and End date could not be determined\.$/,'$1 linha foi ignorada porque não foi possível determinar datas válidas de início e término.'],
  [/^(\d+) rows were skipped because a valid Start and End date could not be determined\.$/,'$1 linhas foram ignoradas porque não foi possível determinar datas válidas de início e término.'],
  [/^Previewing 8 of (\d+) phases\.$/,'Visualizando 8 de $1 fases.'],
  [/^Found schedule on worksheet “(.+)”\. Review the preview below, then import\.$/,'Cronograma encontrado na planilha “$1”. Revise a prévia abaixo e depois importe.'],
  [/^Reading (.+)…$/,'Lendo $1…'],
  [/^Original: (.+)\. Ready to optimize when you save\.$/,'Original: $1. Pronta para otimizar ao salvar.'],
  [/^Optimizing photo… (.+)$/,'Otimizando foto… $1'],
  [/^Reducing dimensions… (.+)$/,'Reduzindo dimensões… $1'],
  [/^Optimized (.+) → (.+) \((\d+)% smaller\) · (.+)$/,'Otimizada $1 → $2 ($3% menor) · $4'],
  [/^Current optimized size: (.+)\.$/,'Tamanho otimizado atual: $1.'],
  [/^Import Excel schedule · (.+)$/,'Importar cronograma do Excel · $1'],
  [/^Open (.+)$/,(...args)=>`Abrir ${localizedPhaseName(args[1])}`],
  [/^Delete construction phase "(.+)"\?$/,'Excluir a fase de construção "$1"?'],
  [/^Delete photo "(.+)"\?$/,'Excluir a foto "$1"?'],
  [/^Delete expense "(.+)" for (.+)\?$/,'Excluir a despesa "$1" no valor de $2?'],
  [/^Delete client login "(.+)"\? Their project data will remain, but access will be removed\.$/,'Excluir o acesso do cliente "$1"? Os dados do projeto permanecerão, mas o acesso será removido.'],
  [/^Delete project "(.+)" and all of its phases, photos, and expenses\? This cannot be undone in this browser\.$/,'Excluir o projeto "$1" e todas as suas fases, fotos e despesas? Isso não poderá ser desfeito neste navegador.'],
  [/^(\d+) expense is waiting for your approval$/,'$1 despesa aguarda sua aprovação'],
  [/^(\d+) expenses are waiting for your approval$/,'$1 despesas aguardam sua aprovação'],
  [/^(\d+) expense is waiting for client approval$/,'$1 despesa aguarda aprovação do cliente'],
  [/^(\d+) expenses are waiting for client approval$/,'$1 despesas aguardam aprovação do cliente'],
  [/^on (.+) · (\d+) phases$/,'em $1 · $2 fases'],
  [/^· (\d+) phases$/,'· $1 fases'],
  [/^(.+) · (\d+)% complete$/,'$1 · $2% concluído'],
  [/^(\d+) schedule items$/,'$1 itens do cronograma'],
  [/^(\d+) uploaded photos$/,'$1 fotos enviadas'],
  [/^(\d+) entries$/,'$1 lançamentos']
];

function localeCode(){ return currentLanguage==='pt'?'pt-BR':'en-US'; }
function translateVisibleText(value){
  if(currentLanguage!=='pt' || value===null || value===undefined) return String(value??'');
  const original=String(value), trimmed=original.trim();
  if(!trimmed) return original;
  let translated=PT_UI[trimmed];
  if(translated===undefined){
    translated=trimmed;
    for(const [pattern,replacement] of PT_DYNAMIC){ if(pattern.test(trimmed)){ translated=typeof replacement==='function'?trimmed.replace(pattern,replacement):trimmed.replace(pattern,replacement); break; } }
  }
  if(translated===trimmed)return original;
  const lead=original.match(/^\s*/)?.[0]||'', tail=original.match(/\s*$/)?.[0]||'';
  return lead+translated+tail;
}
function applyLanguage(root=document){
  document.documentElement.lang=currentLanguage==='pt'?'pt-BR':'en';
  document.title=currentLanguage==='pt'?'Kairos Legacy Homes | Portal do Investidor':'Kairos Legacy Homes | Investor Portal';
  if(currentLanguage!=='pt')return;
  const target=root instanceof Document?root.documentElement:root;
  if(!target)return;
  const walker=document.createTreeWalker(target,NodeFilter.SHOW_TEXT);
  const nodes=[]; while(walker.nextNode())nodes.push(walker.currentNode);
  nodes.forEach(node=>{const next=translateVisibleText(node.nodeValue);if(next!==node.nodeValue)node.nodeValue=next;});
  if(target.querySelectorAll){
    target.querySelectorAll('[placeholder],[title],[aria-label]').forEach(el=>{
      ['placeholder','title','aria-label'].forEach(a=>{if(el.hasAttribute(a))el.setAttribute(a,translateVisibleText(el.getAttribute(a)));});
    });
  }
}
function brazilFlag(){return `<svg viewBox="0 0 28 20" aria-hidden="true"><rect width="28" height="20" rx="2" fill="#169B62"/><path d="M14 2.8 25 10 14 17.2 3 10Z" fill="#FFDF00"/><circle cx="14" cy="10" r="4.25" fill="#002776"/><path d="M10.3 9.3c2.5-.7 5.1-.35 7.4.9" fill="none" stroke="#fff" stroke-width=".75" stroke-linecap="round"/></svg>`;}
function usFlag(){return `<svg viewBox="0 0 28 20" aria-hidden="true"><defs><clipPath id="usClip"><rect width="28" height="20" rx="2"/></clipPath></defs><g clip-path="url(#usClip)"><rect width="28" height="20" fill="#fff"/><path d="M0 0h28v1.55H0zm0 3.08h28v1.55H0zm0 3.08h28v1.55H0zm0 3.08h28v1.55H0zm0 3.08h28v1.55H0zm0 3.08h28v1.55H0zm0 3.08h28V20H0z" fill="#B22234"/><rect width="12.2" height="10.8" fill="#3C3B6E"/><g fill="#fff"><circle cx="1.5" cy="1.45" r=".42"/><circle cx="4" cy="1.45" r=".42"/><circle cx="6.5" cy="1.45" r=".42"/><circle cx="9" cy="1.45" r=".42"/><circle cx="11" cy="1.45" r=".42"/><circle cx="2.7" cy="3.4" r=".42"/><circle cx="5.2" cy="3.4" r=".42"/><circle cx="7.7" cy="3.4" r=".42"/><circle cx="10.2" cy="3.4" r=".42"/><circle cx="1.5" cy="5.35" r=".42"/><circle cx="4" cy="5.35" r=".42"/><circle cx="6.5" cy="5.35" r=".42"/><circle cx="9" cy="5.35" r=".42"/><circle cx="11" cy="5.35" r=".42"/><circle cx="2.7" cy="7.3" r=".42"/><circle cx="5.2" cy="7.3" r=".42"/><circle cx="7.7" cy="7.3" r=".42"/><circle cx="10.2" cy="7.3" r=".42"/><circle cx="1.5" cy="9.25" r=".42"/><circle cx="4" cy="9.25" r=".42"/><circle cx="6.5" cy="9.25" r=".42"/><circle cx="9" cy="9.25" r=".42"/><circle cx="11" cy="9.25" r=".42"/></g></g></svg>`;}
function languageSwitcher(extra=''){return `<div class="language-switcher ${extra}" role="group" aria-label="Language"><button type="button" class="language-flag ${currentLanguage==='pt'?'active':''}" data-language="pt" title="Português (Brasil)" aria-label="Português (Brasil)" aria-pressed="${currentLanguage==='pt'}">${brazilFlag()}<span>PT</span></button><button type="button" class="language-flag ${currentLanguage==='en'?'active':''}" data-language="en" title="English" aria-label="English" aria-pressed="${currentLanguage==='en'}">${usFlag()}<span>EN</span></button></div>`;}
function bindLanguageSwitchers(root=document){root.querySelectorAll?.('[data-language]').forEach(btn=>btn.onclick=()=>{const lang=btn.dataset.language==='pt'?'pt':'en';if(lang===currentLanguage)return;currentLanguage=lang;try{localStorage.setItem(LANG_KEY,currentLanguage);}catch{}render();});}
function confirmLocalized(message){return window.confirm(translateVisibleText(message));}

const svgIcon = (name) => {
  const icons = {
    home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10.5V20h14v-9.5"/><path d="M9.5 20v-6h5v6"/></svg>',
    schedule:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>',
    photos:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m5 18 5-5 3 3 2-2 4 4"/></svg>',
    money:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M15 8.5c-.7-.8-1.7-1.2-3-1.2-1.7 0-3 1-3 2.4 0 3.6 6 1.6 6 4.6 0 1.4-1.2 2.4-3 2.4-1.4 0-2.6-.5-3.4-1.5M12 5.7v12.6"/></svg>',
    admin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3 4.5 6v5c0 4.7 2.8 8.2 7.5 10 4.7-1.8 7.5-5.3 7.5-10V6L12 3Z"/><path d="M9.5 12 11 13.5l3.5-4"/></svg>',
    bell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg>',
    menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
    user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></svg>',
    upload:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M5 13v6h14v-6"/></svg>',
    file:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/></svg>',
    edit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 20h4l11-11-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/></svg>',
    trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16"/><path d="M9 7V4h6v3"/><path d="m7 7 1 13h8l1-13"/><path d="M10 11v5M14 11v5"/></svg>',
    download:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg>',
    check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 4 4L19 6"/></svg>',
    close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6 6 18"/></svg>'
  }; return icons[name] || '';
};

const sampleSvg = (title, subtitle, tones=['#d8dedb','#6e7c76','#15382f']) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="650" viewBox="0 0 900 650">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${tones[0]}"/><stop offset="1" stop-color="${tones[1]}"/></linearGradient></defs>
  <rect width="900" height="650" fill="url(#g)"/><rect x="0" y="450" width="900" height="200" fill="#b9b0a2"/>
  <path d="M200 455V250L450 110l250 140v205" fill="#f5f4ef" stroke="${tones[2]}" stroke-width="14"/>
  <path d="M170 260 450 90l280 170" fill="none" stroke="${tones[2]}" stroke-width="24" stroke-linecap="round"/>
  <rect x="365" y="315" width="170" height="140" fill="#7d6754"/><rect x="245" y="305" width="90" height="90" fill="#a9c5cf" stroke="${tones[2]}" stroke-width="8"/><rect x="565" y="305" width="90" height="90" fill="#a9c5cf" stroke="${tones[2]}" stroke-width="8"/>
  <circle cx="770" cy="105" r="52" fill="#e9cb7c" opacity=".85"/><text x="35" y="55" fill="#ffffff" font-family="Arial" font-size="30" font-weight="700">${title}</text><text x="35" y="90" fill="#f0f5f2" font-family="Arial" font-size="18">${subtitle}</text></svg>`;
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
};


const PHASE_CATEGORIES = [
  'Pre-Construction, Design & Permitting',
  'Site Preparation & Temporary Services',
  'Foundation & Underground',
  'Structure & Framing',
  'Building Envelope & Exterior',
  'MEP Rough-In & Utilities',
  'Insulation & Drywall',
  'Septic, Well & Water Systems',
  'Interior Finishes',
  'Site Improvements & Landscaping',
  'Testing, Startup & Punch',
  'Final Inspections & Turnover',
  'Other / General'
];

function phaseSearchText(name='',code=''){
  return `${code} ${name}`.toLowerCase().replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();
}
function hasAny(text,terms=[]){ return terms.some(term=>text.includes(term)); }
function inferPhaseCategory(name='',code=''){
  const t=phaseSearchText(name,code);
  const numericCode=parseInt(String(code||'').replace(/\D/g,''),10);
  if(Number.isFinite(numericCode) && numericCode>=180 && numericCode<=183) return 'Septic, Well & Water Systems';
  // Final inspections are checked first so they are not swallowed by the trade-specific MEP rules.
  if(hasAny(t,['building final inspection','electrical final inspection','mechanical final inspection','plumbing final inspection','utility inspection final','final building','driveway final inspection','final inspection'])) return 'Final Inspections & Turnover';
  if(hasAny(t,['architectural','engineering design','load calc','survey','topo','print plans','stamp with engineer','permit'])) return 'Pre-Construction, Design & Permitting';
  if(hasAny(t,['cleaning lot','boundary stake','rough stake','house stake','fill dirt','pad','portable toilet','dumpster delivery','remove dumpster','remove portable toilet'])) return 'Site Preparation & Temporary Services';
  if(hasAny(t,['prepare the rail','prepair the rail','compaction','underground','prepare slab','prepair slab','slab inspection','pouring slab','slab','sewer tap inspection','water line inspection'])) return 'Foundation & Underground';
  if(hasAny(t,['exterior masonry','truss','lintel','framing','sheathing'])) return 'Structure & Framing';
  if(hasAny(t,['exterior door','install windows','window','underlayment','dry in','shingle','lathe','stucco','soffit','garage door','painting exterior'])) return 'Building Envelope & Exterior';
  if(hasAny(t,['septic','well installation','water hook up','water meter'])) return 'Septic, Well & Water Systems';
  if(hasAny(t,['plumbing rough','hvac rough','electrical rough','meter can','tug inspection','utility','utilities','electrical meter','plumbing','hvac','electrical'])) return 'MEP Rough-In & Utilities';
  if(hasAny(t,['insulation','insullation','blown insulation','drywall'])) return 'Insulation & Drywall';
  if(hasAny(t,['cabinet','countertop','tile flooring','tile wall','grout','vinyl','flooring','painting interior','final painting','painting caulking','painting front door','baseboard','casing','door knob','door stop','light fixture','plumbing fixture','mirror','blind','shel','appliance','prime flooring','wet walls'])) return 'Interior Finishes';
  if(hasAny(t,['driveway','culvert','final grading','grading','asphalt','site drainage','mailbox','sod','clean out pad','termite bait'])) return 'Site Improvements & Landscaping';
  if(hasAny(t,['pre power','electrical starting','hvac starting','blown door','rough punch','punchout','final cleaning','hook up inspection'])) return 'Testing, Startup & Punch';
  return 'Other / General';
}
function categoryRank(category){ const i=PHASE_CATEGORIES.indexOf(category); return i<0?PHASE_CATEGORIES.length:i; }
function taskCategory(t){ return t?.category || inferPhaseCategory(t?.name||'',t?.code||''); }
function groupedTasks(tasks=[]){
  const groups=new Map();
  tasks.forEach(t=>{ const category=taskCategory(t); if(!groups.has(category))groups.set(category,[]); groups.get(category).push(t); });
  return [...groups.entries()].sort((a,b)=>categoryRank(a[0])-categoryRank(b[0])).map(([category,items])=>({category,items:items.slice().sort((a,b)=>(a.start||'9999').localeCompare(b.start||'9999') || String(a.code||'').localeCompare(String(b.code||'')))}));
}
function phaseCategoryOptions(selected=''){
  return `<option value="">Auto-detect from phase name</option>${PHASE_CATEGORIES.map(c=>`<option value="${attr(c)}" ${selected===c?'selected':''}>${escapeHtml(c)}</option>`).join('')}`;
}

const seed = {
  users:[
    {id:'u-admin',name:'Plinio Alves',email:'admin@kairoslegacyhomes.com',password:'Kairos2026!',role:'admin',projectIds:['p-001','p-002']},
    {id:'u-001',name:'Michael & Sarah Carter',email:'investor1@demo.com',password:'Investor1!',role:'client',projectIds:['p-001']},
    {id:'u-002',name:'Daniel Brooks',email:'investor2@demo.com',password:'Investor2!',role:'client',projectIds:['p-002']}
  ],
  projects:[
    {id:'p-001',name:'Stonegate Ranch Residence',address:'Wesley Chapel, FL',clientId:'u-001',status:'In Construction',start:'2026-08-18',target:'2027-02-12',budget:485000,invested:268450,completion:58,lastUpdate:'2026-10-04',summary:'A modern Florida residence progressing through exterior enclosure and rough-in trades.',
      tasks:[
        {id:'t1',code:'100',name:'Permitting & Mobilization',start:'2026-08-18',end:'2026-08-29',progress:100,status:'done'},
        {id:'t2',code:'200',name:'Sitework & Foundation',start:'2026-09-01',end:'2026-09-18',progress:100,status:'done'},
        {id:'t3',code:'300',name:'Framing & Structural',start:'2026-09-19',end:'2026-10-12',progress:78,status:'current'},
        {id:'t4',code:'340',name:'Electrical Rough-In',start:'2026-10-08',end:'2026-10-23',progress:30,status:'current'},
        {id:'t5',code:'350',name:'HVAC Rough-In',start:'2026-10-13',end:'2026-10-28',progress:0,status:'upcoming'},
        {id:'t6',code:'400',name:'Insulation & Drywall',start:'2026-10-29',end:'2026-11-22',progress:0,status:'upcoming'},
        {id:'t7',code:'460',name:'Interior Finishes',start:'2026-11-23',end:'2027-01-17',progress:0,status:'upcoming'},
        {id:'t8',code:'500',name:'Finals & Turnover',start:'2027-01-18',end:'2027-02-12',progress:0,status:'upcoming'}],
      photos:[
        {id:'ph1',title:'Foundation Complete',date:'2026-09-18',phase:'Sitework & Foundation',url:sampleSvg('Foundation Complete','Sep 18, 2026',['#bcc4bf','#8d8171','#15382f'])},
        {id:'ph2',title:'First-Floor Framing',date:'2026-09-26',phase:'Framing & Structural',url:sampleSvg('First-Floor Framing','Sep 26, 2026',['#d8dedb','#739083','#17372f'])},
        {id:'ph3',title:'Roof Trusses Set',date:'2026-10-04',phase:'Framing & Structural',url:sampleSvg('Roof Trusses Set','Oct 04, 2026',['#c7d3ce','#657d72','#17372f'])}
      ],
      expenses:[
        {cat:'Land / Acquisition',amount:95000},{cat:'Foundation',amount:53500},{cat:'Framing',amount:64750},{cat:'MEP Rough-In',amount:28700},{cat:'Windows / Exterior',amount:26500}
      ]
    },
    {id:'p-002',name:'Magnolia Ridge Build',address:'Spring Hill, FL',clientId:'u-002',status:'Pre-Construction',start:'2026-10-20',target:'2027-04-30',budget:412000,invested:62500,completion:14,lastUpdate:'2026-10-01',summary:'Pre-construction planning, procurement, and permitting for a clean contemporary single-family home.',
      tasks:[
        {id:'x1',code:'100',name:'Design & Engineering',start:'2026-09-15',end:'2026-10-15',progress:90,status:'current'},
        {id:'x2',code:'120',name:'Permitting',start:'2026-10-01',end:'2026-10-24',progress:40,status:'current'},
        {id:'x3',code:'200',name:'Sitework & Foundation',start:'2026-10-26',end:'2026-11-18',progress:0,status:'upcoming'},
        {id:'x4',code:'300',name:'Framing',start:'2026-11-19',end:'2026-12-18',progress:0,status:'upcoming'},
        {id:'x5',code:'500',name:'Interiors & Finals',start:'2027-01-10',end:'2027-04-30',progress:0,status:'upcoming'}],
      photos:[{id:'xph1',title:'Lot Survey & Stakeout',date:'2026-10-01',phase:'Pre-Construction',url:sampleSvg('Lot Survey & Stakeout','Oct 01, 2026',['#dde2df','#8b9a93','#203e35'])}],
      expenses:[{cat:'Land / Acquisition',amount:48000},{cat:'Design & Engineering',amount:9500},{cat:'Permits / Fees',amount:5000}]
    }
  ]
};

const hadSavedLocalState = Boolean(localStorage.getItem(STORE_KEY));
let state = loadState();
let session = loadSession();
let sharedSyncPending = false;
let sharedSyncErrorShown = false;
let sharedSyncChain = Promise.resolve();
let currentView = 'overview';
let selectedProjectId = null;
let scheduleMode = 'gantt';

function deepClone(x){ return JSON.parse(JSON.stringify(x)); }
function normalizeState(raw){
  const data=raw && typeof raw==='object'?raw:deepClone(seed);
  data.users=Array.isArray(data.users)?data.users:[];
  data.projects=Array.isArray(data.projects)?data.projects:[];
  data.users.forEach(u=>{ if(!Array.isArray(u.projectIds))u.projectIds=[]; });
  data.projects.forEach(p=>{
    p.tasks=Array.isArray(p.tasks)?p.tasks:[];
    p.photos=Array.isArray(p.photos)?p.photos:[];
    p.expenses=Array.isArray(p.expenses)?p.expenses:[];
    p.expenseHistory=Array.isArray(p.expenseHistory)?p.expenseHistory:[];
    p.notifications=Array.isArray(p.notifications)?p.notifications:[];
    p.tasks=p.tasks.map(t=>({...t,id:t.id||uid('t'),code:t.code??'',name:t.name||'Untitled phase',category:t.category||inferPhaseCategory(t.name||'',t.code||''),progress:Number(t.progress)||0,duration:Number(t.duration)||daysBetweenInclusive(t.start,t.end),trade:t.trade||'',notes:t.notes||''}));
    p.photos=p.photos.map(ph=>({...ph,id:ph.id||uid('ph'),title:ph.title||'Project photo',date:ph.date||todayISO(),phase:ph.phase||'',url:ph.url||'',mime:ph.mime||'',optimizedBytes:Number(ph.optimizedBytes||ph.bytes)||0,originalBytes:Number(ph.originalBytes)||0,width:Number(ph.width)||0,height:Number(ph.height)||0,originalName:ph.originalName||''}));
    p.expenses=p.expenses.map(e=>({...e,id:e.id||uid('ex'),cat:e.cat||'Other',amount:Number(e.amount)||0,date:e.date||'',vendor:e.vendor||'',notes:e.notes||'',approvalStatus:e.approvalStatus||'not_required',approvalRequestedAt:e.approvalRequestedAt||'',approvalRequestedBy:e.approvalRequestedBy||'',decisionAt:e.decisionAt||'',decisionBy:e.decisionBy||'',decisionComment:e.decisionComment||''}));
    p.expenseHistory=p.expenseHistory.map(h=>({...h,id:h.id||uid('eh'),at:h.at||new Date().toISOString(),action:h.action||'Expense activity',actorName:h.actorName||'System',amount:Number(h.amount)||0,category:h.category||'',status:h.status||''}));
    p.notifications=p.notifications.map(n=>({...n,id:n.id||uid('nt'),type:n.type||'expense_approval',createdAt:n.createdAt||new Date().toISOString(),status:n.status||'pending'}));
  });
  return data;
}
function loadState(){ try{ return normalizeState(JSON.parse(localStorage.getItem(STORE_KEY)) || deepClone(seed)); } catch { return normalizeState(deepClone(seed)); } }
function authHeaders(){ return session?.token?{'Authorization':`Bearer ${session.token}`}:{ }; }
async function apiJson(path,options={}){
  const headers={'Content-Type':'application/json',...(options.headers||{}),...authHeaders()};
  const res=await fetch(path,{...options,headers});
  let body={}; try{ body=await res.json(); }catch{}
  if(!res.ok){ const err=new Error(body.error||`Request failed (${res.status})`); err.status=res.status; throw err; }
  return body;
}
function saveLocalState(){ localStorage.setItem(STORE_KEY,JSON.stringify(state)); }
function saveState(intent={}){
  saveLocalState();
  if(currentUser()?.role!=='admin' || !session?.token) return Promise.resolve({localOnly:true});
  const snapshot=deepClone(state);
  sharedSyncPending=true;
  sharedSyncChain=sharedSyncChain.catch(()=>null).then(()=>apiJson('/api/state',{method:'PUT',body:JSON.stringify({state:snapshot,intent})})).then(result=>{
    sharedSyncPending=false; sharedSyncErrorShown=false;
    // The server is authoritative. It protects records that were not explicitly deleted,
    // so always refresh this browser from the committed server response after a save.
    if(result?.state) state=normalizeState(result.state);
    state.users.forEach(u=>{ if(Object.prototype.hasOwnProperty.call(u,'password')) delete u.password; });
    saveLocalState();
    return result;
  }).catch(err=>{
    sharedSyncPending=false;
    if(err.status===401){ session=null; sessionStorage.removeItem(SESSION_KEY); }
    if(!sharedSyncErrorShown){ sharedSyncErrorShown=true; setTimeout(()=>toast(err.message||'Cloud sync failed. Your server data was not changed.'),50); }
    return {error:err.message};
  });
  return sharedSyncChain;
}
function loadSession(){ try{return JSON.parse(sessionStorage.getItem(SESSION_KEY)) || null}catch{return null} }
function saveSession(){ sessionStorage.setItem(SESSION_KEY,JSON.stringify(session)); }
function money(n){ return new Intl.NumberFormat(localeCode(),{style:'currency',currency:'USD',maximumFractionDigits:0}).format(Number(n||0)); }
function fmtDate(s){ if(!s)return '—'; return new Date(s+'T12:00:00').toLocaleDateString(localeCode(),{month:'short',day:'numeric',year:'numeric'}); }
function initials(name){return name.split(/\s|&/).filter(Boolean).slice(0,2).map(x=>x[0]).join('').toUpperCase()}
function toast(msg){ const t=document.getElementById('toast'); t.textContent=translateVisibleText(msg);t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200); }
function uid(prefix='id'){ return prefix+'-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,7); }
function todayISO(){ const d=new Date(); const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),day=String(d.getDate()).padStart(2,'0'); return `${y}-${m}-${day}`; }

// Construction-photo optimization policy: keep enough detail for investor review while
// aggressively reducing storage. Images are resized in the browser before cloud sync.
const PHOTO_OPTIMIZATION={maxDimension:1600,targetBytes:350*1024,hardMaxBytes:650*1024,startQuality:.78,minQuality:.56,minDimension:1000};
function humanBytes(bytes=0){
  const n=Number(bytes)||0;
  if(n<1024)return `${n} B`;
  if(n<1024*1024)return `${(n/1024).toFixed(n<100*1024?1:0)} KB`;
  return `${(n/1024/1024).toFixed(2)} MB`;
}
function blobToDataUrl(blob){return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=()=>reject(new Error('Unable to read optimized image.'));r.readAsDataURL(blob);});}
function loadImageForOptimization(file){
  return new Promise((resolve,reject)=>{
    const objectUrl=URL.createObjectURL(file),img=new Image();
    img.onload=()=>{URL.revokeObjectURL(objectUrl);resolve(img)};
    img.onerror=()=>{URL.revokeObjectURL(objectUrl);reject(new Error('This photo format could not be opened by the browser. Please use JPEG, PNG, or WebP.'));};
    img.src=objectUrl;
  });
}
async function canvasBlob(canvas,type,quality){
  return new Promise(resolve=>canvas.toBlob(resolve,type,quality));
}
async function optimizeProjectPhoto(file,onProgress=()=>{}){
  if(!file||!file.size)throw new Error('Choose a photo to upload.');
  if(!String(file.type||'').startsWith('image/'))throw new Error('Please select an image file.');
  onProgress('Preparing photo…');
  const img=await loadImageForOptimization(file);
  const naturalW=img.naturalWidth||img.width,naturalH=img.naturalHeight||img.height;
  if(!naturalW||!naturalH)throw new Error('The selected photo has invalid dimensions.');
  let scale=Math.min(1,PHOTO_OPTIMIZATION.maxDimension/Math.max(naturalW,naturalH));
  let width=Math.max(1,Math.round(naturalW*scale)),height=Math.max(1,Math.round(naturalH*scale));
  let best=null;
  const tryEncode=async(w,h,q)=>{
    const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;
    const ctx=canvas.getContext('2d',{alpha:false});
    // Construction photos do not need transparency. A white base also prevents dark
    // backgrounds if a PNG with transparency is uploaded.
    ctx.fillStyle='#fff';ctx.fillRect(0,0,w,h);ctx.drawImage(img,0,0,w,h);
    let blob=await canvasBlob(canvas,'image/webp',q);
    let mime='image/webp';
    // Very old browsers may not encode WebP; JPEG is the compatibility fallback.
    if(!blob){blob=await canvasBlob(canvas,'image/jpeg',q);mime='image/jpeg';}
    return {blob,mime,width:w,height:h,quality:q};
  };
  // First preserve 1600px detail and lower quality only to our visual-quality floor.
  for(let q=PHOTO_OPTIMIZATION.startQuality;q>=PHOTO_OPTIMIZATION.minQuality-.001;q-=.055){
    onProgress(`Optimizing photo… ${Math.round(q*100)}% quality`);
    const encoded=await tryEncode(width,height,Math.max(PHOTO_OPTIMIZATION.minQuality,q));
    if(!best||encoded.blob.size<best.blob.size)best=encoded;
    if(encoded.blob.size<=PHOTO_OPTIMIZATION.targetBytes){best=encoded;break;}
  }
  // If the image is still large, keep the quality floor and reduce dimensions gradually.
  while(best.blob.size>PHOTO_OPTIMIZATION.targetBytes && Math.max(width,height)>PHOTO_OPTIMIZATION.minDimension){
    scale=.88;width=Math.max(1,Math.round(width*scale));height=Math.max(1,Math.round(height*scale));
    onProgress(`Reducing dimensions… ${width}×${height}`);
    const encoded=await tryEncode(width,height,PHOTO_OPTIMIZATION.minQuality);
    if(encoded.blob.size<best.blob.size)best=encoded;
  }
  if(best.blob.size>PHOTO_OPTIMIZATION.hardMaxBytes){
    // One final size-conscious pass. We do not lower the visual quality below the policy floor.
    const factor=Math.sqrt(PHOTO_OPTIMIZATION.hardMaxBytes/best.blob.size)*.96;
    width=Math.max(800,Math.round(best.width*factor));height=Math.max(600,Math.round(best.height*factor));
    const encoded=await tryEncode(width,height,PHOTO_OPTIMIZATION.minQuality);
    if(encoded.blob.size<best.blob.size)best=encoded;
  }
  const dataUrl=await blobToDataUrl(best.blob);
  return {url:dataUrl,mime:best.mime,bytes:best.blob.size,originalBytes:file.size,width:best.width,height:best.height,quality:best.quality,originalName:file.name||'photo'};
}
function taskStatus(t){
  if(Number(t.progress)>=100 || t.status==='done') return 'done';
  if(Number(t.progress)>0) return 'current';
  const today=todayISO();
  if(t.start && t.end && today>t.end) return 'overdue';
  if(t.start && (!t.end || today<=t.end) && today>=t.start) return 'current';
  return 'upcoming';
}
function taskStatusLabel(t){ return ({done:'Complete',current:'In progress',overdue:'Past due',upcoming:'Upcoming'})[taskStatus(t)] || 'Upcoming'; }
function taskStatusClass(t){ return ({done:'status-done',current:'status-live',overdue:'status-overdue',upcoming:'status-plan'})[taskStatus(t)] || 'status-plan'; }
function daysBetweenInclusive(start,end){ if(!start||!end)return 1; const a=new Date(start+'T12:00:00'),b=new Date(end+'T12:00:00'); return Math.max(1,Math.round((b-a)/86400000)+1); }
function scheduleCompletion(tasks=[]){
  if(!tasks.length)return 0;
  let total=0,weighted=0;
  tasks.forEach(t=>{
    const duration=Math.max(1,Number(t.duration)||daysBetweenInclusive(t.start,t.end));
    const progress=Math.max(0,Math.min(100,taskStatus(t)==='done'?100:(Number(t.progress)||0)));
    total+=duration; weighted+=duration*(progress/100);
  });
  return total?Math.round(weighted/total*100):0;
}

function currentUser(){ return state.users.find(u=>u.id===session?.userId); }
function accessibleProjects(){ const u=currentUser(); if(!u)return[]; return u.role==='admin'?state.projects:state.projects.filter(p=>u.projectIds.includes(p.id)); }
function currentProject(){ const list=accessibleProjects(); if(!selectedProjectId || !list.some(p=>p.id===selectedProjectId)) selectedProjectId=list[0]?.id || null; return list.find(p=>p.id===selectedProjectId) || null; }

function nowISO(){ return new Date().toISOString(); }
function fmtDateTime(s){ if(!s)return '—'; const d=new Date(s); if(Number.isNaN(d.getTime()))return '—'; return d.toLocaleString(localeCode(),{month:'short',day:'numeric',year:'numeric',hour:'numeric',minute:'2-digit'}); }
function expenseApprovalStatus(e){ return e?.approvalStatus || 'not_required'; }
function expenseApprovalLabel(e){ return ({pending:'Pending client approval',approved:'Approved',rejected:'Not approved',not_required:'No client approval required'})[expenseApprovalStatus(e)] || 'No client approval required'; }
function expenseApprovalClass(e){ return ({pending:'approval-pending',approved:'approval-approved',rejected:'approval-rejected',not_required:'approval-neutral'})[expenseApprovalStatus(e)] || 'approval-neutral'; }
function addExpenseHistory(p,entry={}){
  p.expenseHistory=Array.isArray(p.expenseHistory)?p.expenseHistory:[];
  p.expenseHistory.push({id:uid('eh'),at:nowISO(),actorId:currentUser()?.id||'',actorName:currentUser()?.name||'System',...entry});
  if(p.expenseHistory.length>500)p.expenseHistory=p.expenseHistory.slice(-500);
}
function requestExpenseApproval(p,expense,{edited=false}={}){
  if(!p.clientId){
    expense.approvalStatus='not_required'; expense.approvalRequestedAt=''; expense.approvalRequestedBy=''; expense.decisionAt=''; expense.decisionBy=''; expense.decisionComment='';
    return false;
  }
  expense.approvalStatus='pending'; expense.approvalRequestedAt=nowISO(); expense.approvalRequestedBy=currentUser()?.id||''; expense.decisionAt=''; expense.decisionBy=''; expense.decisionComment='';
  p.notifications=Array.isArray(p.notifications)?p.notifications:[];
  p.notifications.filter(n=>n.expenseId===expense.id && n.status==='pending').forEach(n=>n.status='superseded');
  p.notifications.push({id:uid('nt'),type:'expense_approval',expenseId:expense.id,targetUserId:p.clientId,status:'pending',createdAt:nowISO(),title:edited?'Expense updated — approval requested':'New expense requires approval',message:`${expense.cat} · ${money(expense.amount)}`});
  return true;
}
function pendingApprovalCount(){
  const u=currentUser(); if(!u)return 0;
  return accessibleProjects().reduce((sum,p)=>sum+p.expenses.filter(e=>expenseApprovalStatus(e)==='pending' && (u.role==='admin' || p.clientId===u.id)).length,0);
}
function pendingApprovalItems(){
  const u=currentUser(); if(!u)return [];
  const items=[];
  accessibleProjects().forEach(p=>p.expenses.forEach(e=>{if(expenseApprovalStatus(e)==='pending' && (u.role==='admin'||p.clientId===u.id))items.push({project:p,expense:e});}));
  return items.sort((a,b)=>String(b.expense.approvalRequestedAt||b.expense.date||'').localeCompare(String(a.expense.approvalRequestedAt||a.expense.date||'')));
}
function expenseHistoryItems(){
  const out=[]; accessibleProjects().forEach(p=>(p.expenseHistory||[]).forEach(h=>out.push({project:p,history:h})));
  return out.sort((a,b)=>String(b.history.at||'').localeCompare(String(a.history.at||'')));
}
function safeDownloadName(ph){
  const base=String(ph?.title||ph?.originalName||'project-photo').replace(/[^a-z0-9-_]+/gi,'-').replace(/^-+|-+$/g,'').slice(0,80)||'project-photo';
  const mime=String(ph?.mime||''); const ext=mime.includes('webp')?'webp':mime.includes('png')?'png':mime.includes('svg')?'svg':'jpg'; return `${base}.${ext}`;
}
function downloadProjectPhoto(photoId){
  const ph=currentProject()?.photos.find(x=>x.id===photoId); if(!ph?.url)return;
  const a=document.createElement('a'); a.href=ph.url; a.download=safeDownloadName(ph); document.body.appendChild(a); a.click(); a.remove();
}
function openPhotoLightbox(photoId){
  const p=currentProject(); if(!p)return;
  const photos=p.photos.slice().reverse(); let index=photos.findIndex(x=>x.id===photoId); if(index<0)return;
  const wrap=document.createElement('div'); wrap.className='photo-lightbox'; wrap.setAttribute('role','dialog'); wrap.setAttribute('aria-modal','true');
  wrap.innerHTML=`<div class="lightbox-stage"><button class="lightbox-close" aria-label="Close">${svgIcon('close')}</button><button class="lightbox-nav prev" aria-label="Previous photo">‹</button><img class="lightbox-image" alt=""><button class="lightbox-nav next" aria-label="Next photo">›</button><div class="lightbox-footer"><div><strong class="lightbox-title"></strong><span class="lightbox-meta"></span></div><button class="btn btn-lightbox-download">${svgIcon('download')} Download</button></div></div>`;
  document.body.appendChild(wrap); applyLanguage(wrap); document.body.classList.add('lightbox-open');
  const img=wrap.querySelector('.lightbox-image'),title=wrap.querySelector('.lightbox-title'),meta=wrap.querySelector('.lightbox-meta'),prev=wrap.querySelector('.prev'),next=wrap.querySelector('.next'),dl=wrap.querySelector('.btn-lightbox-download');
  const draw=()=>{const ph=photos[index];img.src=ph.url;img.alt=ph.title||'Project photo';title.textContent=ph.title?localizedPhaseName(ph.title):translateVisibleText('Project photo');meta.textContent=`${ph.phase?localizedPhotoPhase(ph.phase):translateVisibleText('Project update')} · ${fmtDate(ph.date)} · ${index+1} ${currentLanguage==='pt'?'de':'of'} ${photos.length}`;prev.disabled=photos.length<2;next.disabled=photos.length<2;dl.onclick=()=>downloadProjectPhoto(ph.id);};
  const close=()=>{document.removeEventListener('keydown',keys);document.body.classList.remove('lightbox-open');wrap.remove();};
  const move=delta=>{index=(index+delta+photos.length)%photos.length;draw();};
  const keys=e=>{if(e.key==='Escape')close();if(e.key==='ArrowLeft'&&photos.length>1)move(-1);if(e.key==='ArrowRight'&&photos.length>1)move(1);};
  wrap.querySelector('.lightbox-close').onclick=close; prev.onclick=()=>move(-1); next.onclick=()=>move(1); wrap.onclick=e=>{if(e.target===wrap)close();}; document.addEventListener('keydown',keys); draw();
}
function notificationCenterTemplate(){
  const u=currentUser(),pending=pendingApprovalItems(),history=expenseHistoryItems().slice(0,12);
  return `<div class="notification-summary"><strong>${pending.length}</strong><span>${pending.length===1?'expense is':'expenses are'} waiting for ${u?.role==='client'?'your':'client'} approval</span></div><div class="notification-list">${pending.map(({project,expense})=>`<div class="notification-card"><div class="notification-icon">${svgIcon('money')}</div><div class="notification-copy"><strong>${escapeHtml(localizedExpenseCategory(expense.cat))}</strong><span>${escapeHtml(project.name)} · ${money(expense.amount)}</span><small>Requested ${fmtDateTime(expense.approvalRequestedAt)}</small></div>${u?.role==='client'?`<div class="notification-actions"><button class="btn btn-soft btn-compact" data-expense-decision="rejected" data-expense-id="${expense.id}" data-expense-project="${project.id}">Not approve</button><button class="btn btn-primary btn-compact" data-expense-decision="approved" data-expense-id="${expense.id}" data-expense-project="${project.id}">${svgIcon('check')} Approve</button></div>`:'<span class="approval-badge approval-pending">Awaiting client</span>'}</div>`).join('')||'<div class="empty compact-empty">No expense approvals are waiting.</div>'}</div><div class="notification-history-head"><strong>Recent expense activity</strong></div><div class="notification-history">${history.map(({project,history:h})=>`<div><span class="history-dot ${h.status==='approved'?'ok':h.status==='rejected'?'no':''}"></span><p><strong>${escapeHtml(h.action||'Expense activity')}</strong><small>${escapeHtml(project.name)} · ${escapeHtml(localizedExpenseCategory(h.category||'Expense'))} ${h.amount?`· ${money(h.amount)}`:''}<br>${escapeHtml(h.actorName||'System')} · ${fmtDateTime(h.at)}</small></p></div>`).join('')||'<div class="muted">No expense history yet.</div>'}</div>`;
}
function openNotificationCenter(){
  modal('Notifications & approvals',notificationCenterTemplate(),(w,close)=>{w.querySelectorAll('[data-expense-decision]').forEach(b=>b.onclick=()=>{const projectId=b.dataset.expenseProject,expenseId=b.dataset.expenseId,decision=b.dataset.expenseDecision;close();openExpenseDecisionModal(projectId,expenseId,decision);});});
}
function openExpenseDecisionModal(projectId,expenseId,decision){
  const p=accessibleProjects().find(x=>x.id===projectId),ex=p?.expenses.find(x=>x.id===expenseId); if(!p||!ex)return;
  const approving=decision==='approved';
  modal(approving?'Approve expense':'Do not approve expense',`<form id="expenseDecisionForm"><div class="decision-expense"><span>${escapeHtml(ex.cat)}</span><strong>${money(ex.amount)}</strong><small>${escapeHtml(p.name)}${ex.vendor?` · ${escapeHtml(ex.vendor)}`:''}</small></div><div class="field"><label>Comment (optional)</label><textarea class="textarea" name="comment" placeholder="Add a note for the builder or project record"></textarea></div><div class="form-actions"><button type="button" class="btn btn-soft" id="cancelDecision">Cancel</button><button class="btn ${approving?'btn-primary':'btn-danger-soft'}">${approving?'Approve expense':'Not approve'}</button></div></form>`,(w,close)=>{w.querySelector('#cancelDecision').onclick=close;w.querySelector('#expenseDecisionForm').onsubmit=async e=>{e.preventDefault();const btn=e.submitter||w.querySelector('button[type="submit"]');if(btn)btn.disabled=true;try{const f=new FormData(e.target);const result=await apiJson('/api/expense-decision',{method:'POST',body:JSON.stringify({projectId,expenseId,decision,comment:String(f.get('comment')||'').trim()})});state=normalizeState(result.state);saveLocalState();close();render();toast(approving?'Expense approved':'Expense marked not approved');}catch(err){toast(err.message||'Unable to record decision');if(btn)btn.disabled=false;}};});
}
function expenseHistoryTemplate(p){
  const rows=(p.expenseHistory||[]).slice().sort((a,b)=>String(b.at||'').localeCompare(String(a.at||''))).slice(0,40);
  return `<div class="expense-history-list">${rows.map(h=>`<div class="expense-history-row"><span class="history-dot ${h.status==='approved'?'ok':h.status==='rejected'?'no':''}"></span><div><strong>${escapeHtml(h.action||'Expense activity')}</strong><span>${escapeHtml(localizedExpenseCategory(h.category||'Expense'))} ${h.amount?`· ${money(h.amount)}`:''}${h.details?` · ${escapeHtml(h.details)}`:''}</span></div><div><strong>${escapeHtml(h.actorName||'System')}</strong><span>${fmtDateTime(h.at)}</span></div></div>`).join('')||'<div class="empty compact-empty">No expense history has been recorded yet.</div>'}</div>`;
}

function render(){
  const root=document.getElementById('app');
  if(!session || !currentUser()){ root.innerHTML=loginTemplate(); applyLanguage(root); bindLogin(); bindLanguageSwitchers(root); return; }
  currentProject();
  root.innerHTML=shellTemplate();
  applyLanguage(root);
  bindShell();
  bindLanguageSwitchers(root);
  renderView();
}

function logoMark(){ return `<div class="brand-mark"><svg viewBox="0 0 40 40" fill="none"><path d="M7 19 20 8l13 11v13H7V19Z" stroke="currentColor" stroke-width="2.4"/><path d="M15 32V21h10v11" stroke="currentColor" stroke-width="2.4"/><circle cx="20" cy="16" r="3.2" stroke="#c7a14a" stroke-width="2"/></svg></div>`; }

function loginTemplate(){ return `<div class="auth-shell">${languageSwitcher('auth-language')}
  <section class="auth-visual">
    <div class="brand">${logoMark()}<div class="brand-copy"><strong>Kairos Legacy Homes</strong><span>Investor Project Portal</span></div></div>
    <div class="auth-hero"><div class="auth-kicker">For Such a Time as This</div><h1>Your home. Your investment. Completely visible.</h1><p>A private, investor-friendly portal for construction progress, schedules, project photos, financial visibility, and milestone updates — all in one beautifully organized place.</p></div>
    <div class="auth-stats"><div class="auth-stat"><strong>24/7</strong><span>secure project visibility</span></div><div class="auth-stat"><strong>1 place</strong><span>schedule, photos & spend</span></div><div class="auth-stat"><strong>Private</strong><span>project-by-project access</span></div></div>
  </section>
  <section class="auth-panel"><form class="login-card" id="loginForm">
    <div class="auth-kicker" style="color:#8c6b2e">Investor Portal</div><h2>Welcome back</h2><p class="sub">Sign in to view your construction project or administer client accounts.</p>
    <div class="demo-box"><strong>Demo access</strong><br>Admin: admin@kairoslegacyhomes.com / Kairos2026!<br>Investor: investor1@demo.com / Investor1!</div>
    <div class="field"><label>Email address</label><input class="input" id="email" type="email" autocomplete="username" placeholder="you@example.com" required></div>
    <div class="field"><label>Password</label><input class="input" id="password" type="password" autocomplete="current-password" placeholder="••••••••" required></div>
    <button class="btn btn-primary login-btn" type="submit">Sign in securely</button>
    <div class="login-foot">Shared login is enabled. Accounts created by the administrator can sign in from a phone, tablet, or another computer.</div>
  </form></section>
</div>`; }

function bindLogin(){
  document.getElementById('loginForm').addEventListener('submit',async e=>{
    e.preventDefault();
    const email=document.getElementById('email').value.trim().toLowerCase();
    const password=document.getElementById('password').value;
    const btn=e.target.querySelector('button[type="submit"]');
    btn.disabled=true; btn.textContent=translateVisibleText('Signing in…');
    const localSnapshot=deepClone(state);
    try{
      const result=await apiJson('/api/login',{method:'POST',body:JSON.stringify({email,password})});
      session={userId:result.user.id,token:result.token}; saveSession();
      state=normalizeState(result.state); saveLocalState();
      // One-time migration: the browser where the old Admin created accounts still has
      // the legacy localStorage database. Move it to the shared server automatically.
      if(result.user.role==='admin' && !result.serverInitialized && hadSavedLocalState){
        try{
          const migrated=await apiJson('/api/admin/migrate-local',{method:'POST',body:JSON.stringify({state:localSnapshot})});
          state=normalizeState(migrated.state); saveLocalState();
          setTimeout(()=>toast(`Cloud migration complete: ${migrated.migratedUsers} users and ${migrated.migratedProjects} projects synced`),150);
        }catch(migrateErr){
          if(migrateErr.status!==409) setTimeout(()=>toast('Signed in, but the old browser data could not be migrated to shared storage.'),150);
        }
      }
      selectedProjectId=result.user.role==='admin'?state.projects[0]?.id:(state.users.find(u=>u.id===result.user.id)?.projectIds?.[0]||state.projects[0]?.id);
      currentView='overview'; render();
    }catch(err){
      toast(err.message||'Unable to sign in');
      btn.disabled=false; btn.textContent=translateVisibleText('Sign in securely');
    }
  });
}


async function logout(){
  try{ if(session?.token) await apiJson('/api/logout',{method:'POST',body:'{}'}); }catch{}
  session=null; sessionStorage.removeItem(SESSION_KEY); render();
}
async function boot(){
  if(!session?.token){
    session=null; sessionStorage.removeItem(SESSION_KEY); render(); return;
  }
  try{
    const result=await apiJson('/api/state',{method:'GET'});
    state=normalizeState(result.state); saveLocalState();
    session.userId=result.user.id; saveSession(); render();
  }catch{
    session=null; sessionStorage.removeItem(SESSION_KEY); render();
  }
}

function shellTemplate(){ const u=currentUser(),p=currentProject(); const items=[['overview','home','Overview'],['schedule','schedule','Schedule'],['photos','photos','Photos'],['financials','money','Investment']]; if(u.role==='admin')items.push(['admin','admin','Admin Center']); const notices=pendingApprovalCount(); return `<div class="shell">
<aside class="sidebar" id="sidebar"><div class="side-brand">${logoMark()}<div><strong>Kairos Legacy Homes</strong><small>Project Portal</small></div></div><nav class="nav">${items.map(([v,i,l])=>`<button data-view="${v}" class="${currentView===v?'active':''}">${svgIcon(i)}<span>${l}</span></button>`).join('')}</nav><div class="side-footer"><div class="user-mini"><div class="avatar">${initials(u.name)}</div><div><strong>${u.name}</strong><span>${u.role==='admin'?'Administrator':'Investor / Client'}</span></div></div><button class="logout" id="logoutBtn">Sign out</button></div></aside>
<main class="main"><header class="topbar"><div class="top-left"><button class="mobile-menu" id="mobileMenu">${svgIcon('menu')}</button><div class="crumb"><small>${u.role==='admin'?'Administrative portal':'Private client portal'}</small><strong>${p?.name || 'No project selected'}</strong></div></div><div class="top-actions">${accessibleProjects().length?`<select class="project-switch" id="projectSwitch">${accessibleProjects().map(x=>`<option value="${x.id}" ${x.id===selectedProjectId?'selected':''}>${x.name}</option>`).join('')}</select>`:''}<button class="icon-btn notification-button" id="notificationBtn" title="Notifications & approvals">${svgIcon('bell')}${notices?`<span class="notification-badge">${notices>99?'99+':notices}</span>`:''}</button>${languageSwitcher('top-language')}</div></header><section class="content" id="view"></section></main></div>`; }

function bindShell(){
  document.querySelectorAll('.nav button').forEach(b=>b.onclick=()=>{currentView=b.dataset.view;document.getElementById('sidebar').classList.remove('open');render();});
  document.getElementById('logoutBtn').onclick=logout;
  document.getElementById('mobileMenu').onclick=()=>document.getElementById('sidebar').classList.toggle('open');
  const sw=document.getElementById('projectSwitch'); if(sw)sw.onchange=e=>{selectedProjectId=e.target.value;currentView=currentView==='admin'?'admin':'overview';render();};
  const nb=document.getElementById('notificationBtn'); if(nb)nb.onclick=async()=>{try{const result=await apiJson('/api/state',{method:'GET'});state=normalizeState(result.state);saveLocalState();}catch{}openNotificationCenter();};
}

function renderView(){ const host=document.getElementById('view'); const p=currentProject(); if(!p && currentView!=='admin'){host.innerHTML='<div class="card empty">No project is assigned to this account yet.</div>';applyLanguage(host);return}
  if(currentView==='overview') host.innerHTML=overviewTemplate(p);
  if(currentView==='schedule') host.innerHTML=scheduleTemplate(p);
  if(currentView==='photos') host.innerHTML=photosTemplate(p);
  if(currentView==='financials') host.innerHTML=financialTemplate(p);
  if(currentView==='admin') host.innerHTML=adminTemplate()+buildertrendPanel();
  applyLanguage(host);
  bindView();
  bindBuildertrend();
}

function overviewTemplate(p){
  const remaining=Math.max(p.budget-p.invested,0);
  const next=p.tasks.find(t=>taskStatus(t)==='current') || p.tasks.find(t=>taskStatus(t)==='overdue') || p.tasks.find(t=>taskStatus(t)==='upcoming');
  const synced=p.scheduleSource?`<span class="schedule-sync-note">Schedule synced ${fmtDate(p.scheduleSource.importedDate)} from Excel</span>`:'';
  return `<div class="page-head"><div><h1>Project overview</h1><p>A clear snapshot of schedule, construction progress, and investment activity.</p>${synced}</div><div class="head-actions"><button class="btn btn-outline" data-goto="photos">View latest photos</button><button class="btn btn-primary" data-goto="schedule">Open schedule</button></div></div>
<div class="hero-card card"><div class="eyebrow">${p.status}</div><h2>${p.name}</h2><p>${p.summary}</p><div class="hero-meta"><div><strong>${p.address}</strong><span>Project location</span></div><div><strong>${fmtDate(p.start)}</strong><span>Construction start</span></div><div><strong>${fmtDate(p.target)}</strong><span>Target completion</span></div><div><strong>${fmtDate(p.lastUpdate)}</strong><span>Last project update</span></div></div></div>
<div class="grid grid-4" style="margin-top:18px"><div class="card metric"><span class="label">Project completion</span><div class="value">${p.completion}%</div><div class="progress"><span style="width:${p.completion}%"></span></div><div class="metric-icon">${svgIcon('schedule')}</div></div><div class="card metric"><span class="label">Invested to date</span><div class="value">${money(p.invested)}</div><div class="delta">${p.budget?Math.round((p.invested/p.budget)*100):0}% of project budget</div><div class="metric-icon">${svgIcon('money')}</div></div><div class="card metric"><span class="label">Remaining budget</span><div class="value">${money(remaining)}</div><div class="muted" style="font-size:12px">Total budget ${money(p.budget)}</div></div><div class="card metric"><span class="label">Current / next phase</span><div class="value" style="font-size:19px;line-height:1.3">${next?escapeHtml(localizedPhaseName(next.name)):translateVisibleText('Project Complete')}</div><div class="muted" style="font-size:12px">${next?taskStatusLabel(next):'All milestones complete'}</div></div></div>
<div class="grid grid-2" style="margin-top:18px"><div class="card"><div class="card-head"><h3>Construction phases</h3><span class="muted">${p.tasks.filter(x=>taskStatus(x)==='done').length} of ${p.tasks.length} completed</span></div>${p.tasks.slice(0,6).map((t,i)=>phaseRow(t,i)).join('')}</div><div class="card"><div class="card-head"><h3>Latest project photos</h3><button class="btn btn-soft" data-goto="photos">View all</button></div><div class="gallery" style="grid-template-columns:1fr 1fr">${p.photos.slice(-4).reverse().map(photoCard).join('')||'<div class="empty">No photos uploaded yet.</div>'}</div></div></div>`;
}

function phaseRow(t,i){
  return `<div class="phase-row"><div class="phase-num">${escapeHtml(t.code||String(i+1).padStart(2,'0'))}</div><div class="phase-title"><strong>${escapeHtml(localizedPhaseName(t.name))}</strong><span>${fmtDate(t.start)} – ${fmtDate(t.end)}</span><em class="phase-category-chip">${escapeHtml(taskCategory(t))}</em></div><div class="progress"><span style="width:${Math.max(0,Math.min(100,Number(t.progress)||0))}%"></span></div><div class="phase-status ${taskStatusClass(t)}">${taskStatusLabel(t)}</div></div>`;
}

function scheduleTemplate(p){
  const admin=currentUser().role==='admin';
  const src=p.scheduleSource;
  return `<div class="page-head"><div><h1>Construction schedule</h1><p>Follow every construction phase and planned work from start through turnover.</p>${src?`<div class="schedule-source"><span>${svgIcon('file')}</span><span>${currentLanguage==='pt'?`Última sincronização com Excel: <strong>${fmtDate(src.importedDate)}</strong> · ${src.rows} fases`:`Last Excel sync: <strong>${fmtDate(src.importedDate)}</strong> · ${src.rows} phases`}</span></div>`:''}</div><div class="head-actions">${admin?`<button class="btn btn-soft" id="scheduleAddPhaseBtn">${svgIcon('plus')} Add phase</button><button class="btn btn-outline" id="scheduleImportBtn">${svgIcon('upload')} Import Excel</button>`:''}<div class="tabs"><button data-smode="gantt" class="${scheduleMode==='gantt'?'active':''}">Gantt</button><button data-smode="list" class="${scheduleMode==='list'?'active':''}">List</button></div></div></div><div class="card">${scheduleMode==='gantt'?ganttTemplate(p):listScheduleTemplate(p)}</div>`;
}
function monthStartFromISO(s){ const d=new Date(s+'T12:00:00'); return new Date(d.getFullYear(),d.getMonth(),1); }
function monthDiff(a,b){ return (b.getFullYear()-a.getFullYear())*12+(b.getMonth()-a.getMonth()); }
function addMonth(d,n){ return new Date(d.getFullYear(),d.getMonth()+n,1); }
function ganttTemplate(p){
  const dated=p.tasks.filter(t=>t.start&&t.end);
  if(!dated.length) return '<div class="empty">No dated construction phases yet. Import a project schedule or add phases manually.</div>';
  let first=dated.reduce((a,t)=>monthStartFromISO(t.start)<a?monthStartFromISO(t.start):a,monthStartFromISO(dated[0].start));
  let last=dated.reduce((a,t)=>monthStartFromISO(t.end)>a?monthStartFromISO(t.end):a,monthStartFromISO(dated[0].end));
  const monthCount=Math.min(36,Math.max(1,monthDiff(first,last)+1));
  const months=Array.from({length:monthCount},(_,i)=>addMonth(first,i));
  const template=`260px repeat(${monthCount},minmax(78px,1fr))`;
  const minWidth=Math.max(960,260+monthCount*82);
  const groups=groupedTasks(dated);
  let rowIndex=0;
  const rows=groups.map(group=>{
    const groupRows=group.items.map(t=>{
      const i=rowIndex++;
      const start=Math.max(0,Math.min(monthCount-1,monthDiff(first,monthStartFromISO(t.start))));
      const end=Math.max(start,Math.min(monthCount-1,monthDiff(first,monthStartFromISO(t.end))));
      const st=taskStatus(t);
      return `<div class="gantt-row" style="grid-template-columns:${template};--months:${monthCount}"><div class="label"><strong>${escapeHtml(t.code||String(i+1))} · ${escapeHtml(localizedPhaseName(t.name))}</strong><span>${fmtDate(t.start)} – ${fmtDate(t.end)} · ${taskStatusLabel(t)}</span></div><div class="gantt-grid">${Array(monthCount).fill('<i></i>').join('')}</div><div class="bar ${st}" style="grid-column:${start+2}/${end+3};grid-row:1" title="${attr(localizedPhaseName(t.name))}: ${fmtDate(t.start)} – ${fmtDate(t.end)}"></div></div>`;
    }).join('');
    return `<div class="gantt-category-row" style="grid-template-columns:${template}"><div><strong>${escapeHtml(group.category)}</strong><span>${group.items.length} ${currentLanguage==='pt'?(group.items.length===1?'fase':'fases'):(group.items.length===1?'phase':'phases')}</span></div><div class="gantt-category-line"></div></div>${groupRows}`;
  }).join('');
  return `<div class="schedule-category-summary"><strong>${groups.length} construction categories</strong><span>Phases are automatically grouped by their broader construction scope. Admins can change the category on any individual phase.</span></div><div class="timeline"><div class="gantt" style="min-width:${minWidth}px"><div class="gantt-head" style="grid-template-columns:${template}"><div>Phase / trade</div>${months.map(m=>`<div>${m.toLocaleDateString(localeCode(),{month:'short',year:'2-digit'})}</div>`).join('')}</div>${rows}</div></div>`;
}
function listScheduleTemplate(p){
  const admin=currentUser().role==='admin';
  const groups=groupedTasks(p.tasks);
  const colspan=admin?8:7;
  const body=groups.map(group=>`<tr class="schedule-category-row"><td colspan="${colspan}"><div><strong>${escapeHtml(group.category)}</strong><span>${group.items.length} ${currentLanguage==='pt'?(group.items.length===1?'fase':'fases'):(group.items.length===1?'phase':'phases')}</span></div></td></tr>${group.items.map(t=>`<tr><td>${escapeHtml(t.code||'—')}</td><td><strong>${escapeHtml(localizedPhaseName(t.name))}</strong><span class="category-inline">${escapeHtml(taskCategory(t))}</span></td><td>${fmtDate(t.start)}</td><td>${fmtDate(t.end)}</td><td>${Number(t.duration)||daysBetweenInclusive(t.start,t.end)}</td><td style="min-width:150px"><div class="progress"><span style="width:${Math.max(0,Math.min(100,Number(t.progress)||0))}%"></span></div><span class="table-progress-label">${Math.max(0,Math.min(100,Number(t.progress)||0))}%</span></td><td><span class="pill ${taskStatus(t)==='overdue'?'pill-overdue':''}">${taskStatusLabel(t)}</span></td>${admin?`<td><div class="action-group phase-actions"><button class="btn btn-soft btn-compact" title="Edit phase" data-edit-task="${t.id}">${svgIcon('edit')} Edit</button><button class="icon-action danger" title="Delete phase" data-delete-task="${t.id}">${svgIcon('trash')}</button></div></td>`:''}</tr>`).join('')}`).join('');
  return `<div class="schedule-category-summary"><strong>${groups.length} construction categories</strong><span>Phases are automatically grouped into the broader category that best matches the work.</span></div><div class="table-wrap"><table class="table schedule-table"><thead><tr><th>Code</th><th>Phase</th><th>Start</th><th>Finish</th><th>Days</th><th>Progress</th><th>Status</th>${admin?'<th>Actions</th>':''}</tr></thead><tbody>${body}</tbody></table></div>`;
}

function photosTemplate(p){
  const admin=currentUser().role==='admin';
  return `<div class="page-head"><div><h1>Project photos</h1><p>Progress documentation organized by project and phase. Select any photo to enlarge it, move through the gallery, or download a copy.</p></div>${admin?`<button class="btn btn-primary" id="addPhotoBtn">${svgIcon('plus')} Add photo</button>`:''}</div><div class="card"><div class="gallery">${p.photos.slice().reverse().map(ph=>photoCard(ph,admin)).join('')||'<div class="empty">No photos have been uploaded for this project yet.</div>'}</div></div>`;
}
function photoCard(ph,admin=false){
  return `<div class="photo photo-clickable" data-photo-open="${ph.id}" tabindex="0" role="button" aria-label="Open ${attr(ph.title||'project photo')}"><img src="${ph.url}" alt="${escapeHtml(ph.title)}"><div class="photo-overlay"><strong>${escapeHtml(localizedPhaseName(ph.title))}</strong><span>${escapeHtml(ph.phase?localizedPhotoPhase(ph.phase):translateVisibleText('Project update'))} · ${fmtDate(ph.date)}</span><small>Click to enlarge</small></div><div class="photo-view-actions"><button class="icon-action light" title="Download photo" data-download-photo="${ph.id}">${svgIcon('download')}</button>${admin?`<button class="icon-action light" title="Edit photo" data-edit-photo="${ph.id}">${svgIcon('edit')}</button><button class="icon-action light danger" title="Delete photo" data-delete-photo="${ph.id}">${svgIcon('trash')}</button>`:''}</div></div>`;
}

function aggregateExpenseCategories(expenses=[]){
  const map=new Map();
  expenses.forEach(e=>{ const cat=String(e.cat||'Other').trim()||'Other'; map.set(cat,(map.get(cat)||0)+(Number(e.amount)||0)); });
  return [...map.entries()].map(([cat,amount])=>({cat,amount})).sort((a,b)=>b.amount-a.amount);
}
function financialTemplate(p){
  const admin=currentUser().role==='admin',client=!admin;
  const pct=p.budget?Math.min(100,Math.round((p.invested/p.budget)*100)):0;
  const categorySpend=aggregateExpenseCategories(p.expenses);
  const max=Math.max(...categorySpend.map(e=>Number(e.amount)||0),1);
  const pending=p.expenses.filter(e=>expenseApprovalStatus(e)==='pending');
  const approvalPanel=pending.length?`<div class="card approval-panel" style="margin-top:18px"><div class="card-head"><div><h3>${client?'Expenses awaiting your approval':'Expenses awaiting client approval'}</h3><span class="muted">${pending.length} pending approval${pending.length===1?'':'s'} · all decisions are recorded in project history</span></div><span class="approval-badge approval-pending">${pending.length} pending</span></div><div class="approval-card-grid">${pending.map(e=>`<div class="approval-card"><div><span>${escapeHtml(localizedExpenseCategory(e.cat))}</span><strong>${money(e.amount)}</strong><small>${escapeHtml(e.vendor||'No vendor entered')} · requested ${fmtDateTime(e.approvalRequestedAt)}</small></div>${client?`<div class="approval-card-actions"><button class="btn btn-soft btn-compact" data-expense-decision="rejected" data-expense-id="${e.id}" data-expense-project="${p.id}">Not approve</button><button class="btn btn-primary btn-compact" data-expense-decision="approved" data-expense-id="${e.id}" data-expense-project="${p.id}">${svgIcon('check')} Approve</button></div>`:'<span class="approval-badge approval-pending">Waiting</span>'}</div>`).join('')}</div></div>`:'';
  return `<div class="page-head"><div><h1>Investment & budget</h1><p>Investor-friendly visibility into budget utilization, project costs, approvals, and expense history.</p></div>${admin?`<button class="btn btn-primary" id="financialAddExpenseBtn">${svgIcon('plus')} Add expense</button>`:''}</div><div class="grid grid-3"><div class="card metric"><span class="label">Approved project budget</span><div class="value">${money(p.budget)}</div><div class="muted" style="font-size:12px">${currentLanguage==='pt'?(admin?'Orçamento autorizado atual · novas despesas atualizam este valor automaticamente':'Orçamento autorizado atual'):(admin?'Current authorized budget · new expenses update this automatically':'Current authorized budget')}</div></div><div class="card metric"><span class="label">Invested to date</span><div class="value">${money(p.invested)}</div><div class="delta">${pct}% utilized</div></div><div class="card metric"><span class="label">Remaining capital</span><div class="value">${money(Math.max(0,p.budget-p.invested))}</div><div class="muted" style="font-size:12px">Based on current budget</div></div></div>${approvalPanel}<div class="card" style="margin-top:18px"><div class="card-head"><h3>Capital utilization</h3><span class="muted">Updated ${fmtDate(p.lastUpdate)}</span></div><div class="finance-wrap"><div><div class="donut" style="--pct:${pct}%"><div class="center"><strong>${pct}%</strong><span>budget utilized</span></div></div><div class="progress gold"><span style="width:${pct}%"></span></div></div><div><h3 style="margin:5px 0 18px;font-size:15px">Spend by category</h3><div class="spend-bars">${categorySpend.map(e=>`<div class="spend-item"><span>${escapeHtml(localizedExpenseCategory(e.cat))}</span><div class="spend-track"><span style="width:${Math.round((Number(e.amount)||0)/max*100)}%"></span></div><b>${money(e.amount)}</b></div>`).join('')||'<div class="muted">No expenses entered yet.</div>'}</div></div></div></div><div class="card" style="margin-top:18px"><div class="card-head"><div><h3>Expense ledger</h3><span class="muted">${admin?'Edit transactions and monitor client decisions':'Review project expenses and approval status'}</span></div>${admin?`<button class="btn btn-soft" id="financialAddExpenseBtn2">${svgIcon('plus')} Add expense</button>`:''}</div>${expenseTableTemplate(p,admin)}</div><div class="card" style="margin-top:18px"><div class="card-head"><div><h3>Expense approval history</h3><span class="muted">Permanent in-app record of requests, edits, approvals, rejections, and deletions</span></div></div>${expenseHistoryTemplate(p)}</div><div class="card pad" style="margin-top:18px"><strong style="font-size:13px">Investor note</strong><p class="muted" style="font-size:12px;line-height:1.7;margin-bottom:0">New expenses are immediately reflected in Approved Project Budget and Invested to Date as requested. Client approval or non-approval is tracked separately as an acknowledgement/decision and does not erase the recorded project cost.</p></div>`;
}

function expenseTableTemplate(p,withActions=false){
  const client=currentUser()?.role==='client';
  return `<div class="table-wrap"><table class="table"><thead><tr><th>Date</th><th>Category</th><th>Vendor / payee</th><th>Notes</th><th>Amount</th><th>Client approval</th>${withActions?'<th>Actions</th>':''}</tr></thead><tbody>${p.expenses.map(e=>`<tr><td>${fmtDate(e.date)}</td><td><strong>${escapeHtml(localizedExpenseCategory(e.cat))}</strong></td><td>${escapeHtml(e.vendor||'—')}</td><td class="wrap-cell">${escapeHtml(e.notes||'—')}</td><td><strong>${money(e.amount)}</strong></td><td><span class="approval-badge ${expenseApprovalClass(e)}">${expenseApprovalLabel(e)}</span>${e.decisionComment?`<small class="approval-comment">“${escapeHtml(e.decisionComment)}”</small>`:''}${client&&expenseApprovalStatus(e)==='pending'?`<div class="inline-decision-actions"><button class="btn btn-soft btn-compact" data-expense-decision="rejected" data-expense-id="${e.id}" data-expense-project="${p.id}">Not approve</button><button class="btn btn-primary btn-compact" data-expense-decision="approved" data-expense-id="${e.id}" data-expense-project="${p.id}">Approve</button></div>`:''}</td>${withActions?`<td><div class="action-group"><button class="icon-action" title="Edit expense" data-edit-expense="${e.id}">${svgIcon('edit')}</button><button class="icon-action danger" title="Delete expense" data-delete-expense="${e.id}">${svgIcon('trash')}</button></div></td>`:''}</tr>`).join('')||`<tr><td colspan="${withActions?7:6}" class="muted">No expenses have been added.</td></tr>`}</tbody></table></div>`;
}

function adminTemplate(){
  const users=state.users.filter(u=>u.role==='client');
  return `<div class="page-head"><div><h1>Admin center</h1><p>Full editing control for client access, projects, construction phases, photos, expenses, budgets, and schedule imports.</p></div><div class="head-actions"><button class="btn btn-outline" id="newClientBtn">${svgIcon('user')} New client</button><button class="btn btn-primary" id="newProjectBtn">${svgIcon('plus')} New project</button></div></div>
  <div class="grid grid-4"><div class="card metric"><span class="label">Client accounts</span><div class="value">${users.length}</div></div><div class="card metric"><span class="label">Active projects</span><div class="value">${state.projects.length}</div></div><div class="card metric"><span class="label">Portfolio budget</span><div class="value">${money(state.projects.reduce((a,p)=>a+(Number(p.budget)||0),0))}</div></div><div class="card metric"><span class="label">Capital deployed</span><div class="value">${money(state.projects.reduce((a,p)=>a+(Number(p.invested)||0),0))}</div></div></div>
  <div class="admin-split" style="margin-top:18px"><div class="card list-card"><div class="card-head"><h3>Projects</h3><span class="muted">Select to manage</span></div>${state.projects.map(p=>`<div class="list-item ${p.id===selectedProjectId?'active':''}" data-admin-project="${p.id}"><strong>${escapeHtml(p.name)}</strong><span>${escapeHtml(p.address)} · ${p.completion}% ${currentLanguage==='pt'?'concluído':'complete'}</span></div>`).join('')||'<div class="empty">No projects yet.</div>'}</div><div class="card" id="adminEditor">${adminEditorTemplate(currentProject())}</div></div>
  <div class="card admin-section" style="margin-top:18px"><div class="card-head"><div><h3>Client login accounts</h3><span class="muted">Edit credentials and project access assignments</span></div><button class="btn btn-soft" id="newClientBtn2">${svgIcon('user')} New client</button></div><div class="table-wrap"><table class="table"><thead><tr><th>Client</th><th>Email</th><th>Assigned project(s)</th><th>Role</th><th>Actions</th></tr></thead><tbody>${users.map(u=>`<tr><td><strong>${escapeHtml(u.name)}</strong></td><td>${escapeHtml(u.email)}</td><td class="wrap-cell">${u.projectIds.map(id=>state.projects.find(p=>p.id===id)?.name).filter(Boolean).map(escapeHtml).join(', ')||'None'}</td><td><span class="pill">Client</span></td><td><div class="action-group"><button class="icon-action" title="Edit client" data-edit-user="${u.id}">${svgIcon('edit')}</button><button class="icon-action danger" title="Delete client" data-delete-user="${u.id}">${svgIcon('trash')}</button></div></td></tr>`).join('')||'<tr><td colspan="5" class="muted">No client accounts yet.</td></tr>'}</tbody></table></div></div>`;
}

function adminEditorTemplate(p){
  if(!p)return '<div class="empty">Create a project to begin.</div>';
  const client=state.users.find(u=>u.id===p.clientId);
  const src=p.scheduleSource;
  return `<div class="card-head"><div><h3>${escapeHtml(p.name)}</h3><span class="muted">${escapeHtml(p.address)}</span></div><div class="head-actions"><button class="btn btn-soft" id="editProjectBtn">${svgIcon('edit')} Edit project</button><button class="btn btn-danger-soft" id="deleteProjectBtn">${svgIcon('trash')} Delete</button></div></div>
  <div class="pad">
    <div class="grid grid-3"><div><div class="muted mini-label">Assigned client</div><strong class="mini-value">${escapeHtml(client?.name||'Unassigned')}</strong></div><div><div class="muted mini-label">Budget</div><strong class="mini-value">${money(p.budget)}</strong></div><div><div class="muted mini-label">Completion</div><strong class="mini-value">${p.completion}%</strong></div></div><div class="progress" style="margin:18px 0 22px"><span style="width:${p.completion}%"></span></div>
    <div class="schedule-import-box"><div class="schedule-import-icon">${svgIcon('file')}</div><div class="schedule-import-copy"><strong>Excel construction schedule</strong>${src?`<span>${currentLanguage==='pt'?`Sincronizado de <b>${escapeHtml(src.fileName)}</b> em ${fmtDate(src.importedDate)} · ${src.rows} fases`:`Synced from <b>${escapeHtml(src.fileName)}</b> on ${fmtDate(src.importedDate)} · ${src.rows} phases`}</span>`:'<span>No spreadsheet has been imported for this project yet.</span>'}<small>Upload this project's spreadsheet to replace or merge phases, dates, completion flags, duration, and project schedule dates.</small></div><div class="schedule-import-actions"><button class="btn btn-primary" id="importScheduleBtn">${svgIcon('upload')} ${src?'Update from Excel':'Import Excel'}</button><a class="btn btn-soft" href="Kairos_Construction_Schedule_Template.xlsx" download>Template</a>${p.scheduleBackup?'<button class="btn btn-soft" id="undoScheduleImportBtn">Undo last import</button>':''}</div></div>
    <div class="admin-action-row"><button class="btn btn-outline" id="addTaskBtn">${svgIcon('plus')} Add phase</button><button class="btn btn-outline" id="adminAddPhotoBtn">${svgIcon('plus')} Add photo</button><button class="btn btn-outline" id="addExpenseBtn">${svgIcon('plus')} Add expense</button></div>
  </div>

  <div class="admin-subsection"><div class="card-head"><div><h3>Project phases</h3><span class="muted">${p.tasks.length} schedule items · each phase is assigned to a broader construction category</span></div><button class="btn btn-soft" id="addTaskBtn2">${svgIcon('plus')} Add phase</button></div>
  <div class="table-wrap"><table class="table"><thead><tr><th>Code</th><th>Phase</th><th>Category</th><th>Dates</th><th>Progress</th><th>Status</th><th>Actions</th></tr></thead><tbody>${groupedTasks(p.tasks).flatMap(g=>g.items).map(t=>`<tr><td>${escapeHtml(t.code||'—')}</td><td><strong>${escapeHtml(localizedPhaseName(t.name))}</strong></td><td><span class="category-admin-chip">${escapeHtml(taskCategory(t))}</span></td><td>${fmtDate(t.start)} → ${fmtDate(t.end)}</td><td><span class="mini-progress">${Math.max(0,Math.min(100,Number(t.progress)||0))}%</span></td><td><span class="pill ${taskStatus(t)==='overdue'?'pill-overdue':''}">${taskStatusLabel(t)}</span></td><td><div class="action-group phase-actions"><button class="btn btn-soft btn-compact" title="Edit construction phase" data-edit-task="${t.id}">${svgIcon('edit')} Edit phase</button><button class="icon-action danger" title="Delete phase" data-delete-task="${t.id}">${svgIcon('trash')}</button></div></td></tr>`).join('')||'<tr><td colspan="7" class="muted">No construction phases yet.</td></tr>'}</tbody></table></div></div>

  <div class="admin-subsection"><div class="card-head"><div><h3>Project photos</h3><span class="muted">${p.photos.length} uploaded photos · edit title, date, phase, or replace the image</span></div><button class="btn btn-soft" id="adminAddPhotoBtn2">${svgIcon('plus')} Add photo</button></div>
  <div class="table-wrap"><table class="table"><thead><tr><th>Photo</th><th>Title</th><th>Phase</th><th>Date</th><th>Storage</th><th>Actions</th></tr></thead><tbody>${p.photos.slice().reverse().map(ph=>`<tr><td><img class="table-thumb clickable-thumb" data-photo-open="${ph.id}" src="${ph.url}" alt="${attr(ph.title||'Project photo')}"></td><td><strong>${escapeHtml(localizedPhaseName(ph.title))}</strong></td><td>${escapeHtml(ph.phase?localizedPhotoPhase(ph.phase):'—')}</td><td>${fmtDate(ph.date)}</td><td><span class="storage-size">${ph.optimizedBytes?humanBytes(ph.optimizedBytes):'Legacy image'}</span></td><td><div class="action-group"><button class="icon-action" title="Edit photo" data-edit-photo="${ph.id}">${svgIcon('edit')}</button><button class="icon-action danger" title="Delete photo" data-delete-photo="${ph.id}">${svgIcon('trash')}</button></div></td></tr>`).join('')||'<tr><td colspan="6" class="muted">No photos uploaded yet.</td></tr>'}</tbody></table></div></div>

  <div class="admin-subsection"><div class="card-head"><div><h3>Project expenses</h3><span class="muted">${p.expenses.length} entries · invested total ${money(p.invested)}</span></div><button class="btn btn-soft" id="addExpenseBtn2">${svgIcon('plus')} Add expense</button></div>${expenseTableTemplate(p,true)}</div>`;
}

function bindView(){
  document.querySelectorAll('[data-goto]').forEach(b=>b.onclick=()=>{currentView=b.dataset.goto;render();});
  document.querySelectorAll('[data-smode]').forEach(b=>b.onclick=()=>{scheduleMode=b.dataset.smode;renderView();});
  const addPhoto=document.getElementById('addPhotoBtn'); if(addPhoto)addPhoto.onclick=()=>openPhotoModal();
  const si=document.getElementById('scheduleImportBtn'); if(si)si.onclick=openScheduleImportModal;
  const sap=document.getElementById('scheduleAddPhaseBtn'); if(sap)sap.onclick=()=>openTaskModal();
  const fe=document.getElementById('financialAddExpenseBtn'); if(fe)fe.onclick=()=>openExpenseModal();
  const fe2=document.getElementById('financialAddExpenseBtn2'); if(fe2)fe2.onclick=()=>openExpenseModal();

  document.querySelectorAll('[data-photo-open]').forEach(el=>{el.onclick=e=>{if(e.target.closest('button'))return;openPhotoLightbox(el.dataset.photoOpen);};el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openPhotoLightbox(el.dataset.photoOpen);}};});
  document.querySelectorAll('[data-download-photo]').forEach(b=>b.onclick=e=>{e.stopPropagation();downloadProjectPhoto(b.dataset.downloadPhoto);});
  document.querySelectorAll('[data-edit-task]').forEach(b=>b.onclick=()=>{const t=currentProject()?.tasks.find(x=>x.id===b.dataset.editTask);if(t)openTaskModal(t);});
  document.querySelectorAll('[data-delete-task]').forEach(b=>b.onclick=()=>deleteTask(b.dataset.deleteTask));
  document.querySelectorAll('[data-edit-photo]').forEach(b=>b.onclick=e=>{e.stopPropagation();const ph=currentProject()?.photos.find(x=>x.id===b.dataset.editPhoto);if(ph)openPhotoModal(ph);});
  document.querySelectorAll('[data-delete-photo]').forEach(b=>b.onclick=e=>{e.stopPropagation();deletePhoto(b.dataset.deletePhoto);});
  document.querySelectorAll('[data-edit-expense]').forEach(b=>b.onclick=()=>{const ex=currentProject()?.expenses.find(x=>x.id===b.dataset.editExpense);if(ex)openExpenseModal(ex);});
  document.querySelectorAll('[data-delete-expense]').forEach(b=>b.onclick=()=>deleteExpense(b.dataset.deleteExpense));
  document.querySelectorAll('[data-expense-decision]').forEach(b=>b.onclick=()=>openExpenseDecisionModal(b.dataset.expenseProject,b.dataset.expenseId,b.dataset.expenseDecision));

  if(currentView==='admin') bindAdmin();
}

function bindAdmin(){
  document.querySelectorAll('[data-admin-project]').forEach(x=>x.onclick=()=>{selectedProjectId=x.dataset.adminProject;renderView();});
  const nc=document.getElementById('newClientBtn'); if(nc)nc.onclick=()=>openClientModal();
  const nc2=document.getElementById('newClientBtn2'); if(nc2)nc2.onclick=()=>openClientModal();
  const np=document.getElementById('newProjectBtn'); if(np)np.onclick=()=>openProjectModal();
  const ep=document.getElementById('editProjectBtn'); if(ep)ep.onclick=()=>openProjectModal(currentProject());
  const dp=document.getElementById('deleteProjectBtn'); if(dp)dp.onclick=()=>deleteProject(currentProject()?.id);
  const at=document.getElementById('addTaskBtn'); if(at)at.onclick=()=>openTaskModal();
  const at2=document.getElementById('addTaskBtn2'); if(at2)at2.onclick=()=>openTaskModal();
  const ap=document.getElementById('adminAddPhotoBtn'); if(ap)ap.onclick=()=>openPhotoModal();
  const ap2=document.getElementById('adminAddPhotoBtn2'); if(ap2)ap2.onclick=()=>openPhotoModal();
  const ae=document.getElementById('addExpenseBtn'); if(ae)ae.onclick=()=>openExpenseModal();
  const ae2=document.getElementById('addExpenseBtn2'); if(ae2)ae2.onclick=()=>openExpenseModal();
  const im=document.getElementById('importScheduleBtn'); if(im)im.onclick=openScheduleImportModal;
  const undo=document.getElementById('undoScheduleImportBtn'); if(undo)undo.onclick=undoLastScheduleImport;

  document.querySelectorAll('[data-edit-user]').forEach(b=>b.onclick=()=>{const u=state.users.find(x=>x.id===b.dataset.editUser);if(u)openClientModal(u);});
  document.querySelectorAll('[data-delete-user]').forEach(b=>b.onclick=()=>deleteClient(b.dataset.deleteUser));
}

function applyExpenseFinancialDelta(p,delta){
  const change=Number(delta)||0;
  p.invested=Math.max(0,(Number(p.invested)||0)+change);
  p.budget=Math.max(0,(Number(p.budget)||0)+change);
  p.lastUpdate=todayISO();
}
async function adminDeleteRecord(type,id,projectId=''){
  const result=await apiJson('/api/admin/delete',{method:'POST',body:JSON.stringify({type,id,projectId})});
  if(result?.state){ state=normalizeState(result.state); saveLocalState(); }
  return result;
}
async function deleteTask(id){
  const p=currentProject(); if(!p)return;
  const t=p.tasks.find(x=>x.id===id); if(!t)return;
  if(!confirmLocalized(`Delete construction phase "${t.name}"?`))return;
  try{ await adminDeleteRecord('task',id,p.id); renderView(); toast('Phase deleted'); }
  catch(err){ toast(err.message||'Unable to delete phase'); }
}
async function deletePhoto(id){
  const p=currentProject(); if(!p)return;
  const ph=p.photos.find(x=>x.id===id); if(!ph)return;
  if(!confirmLocalized(`Delete photo "${ph.title}"?`))return;
  try{ await adminDeleteRecord('photo',id,p.id); renderView(); toast('Photo deleted'); }
  catch(err){ toast(err.message||'Unable to delete photo'); }
}
async function deleteExpense(id){
  const p=currentProject(); if(!p)return;
  const ex=p.expenses.find(x=>x.id===id); if(!ex)return;
  if(!confirmLocalized(`Delete expense "${ex.cat}" for ${money(ex.amount)}?`))return;
  try{ await adminDeleteRecord('expense',id,p.id); renderView(); toast('Expense deleted; budget and invested totals adjusted'); }
  catch(err){ toast(err.message||'Unable to delete expense'); }
}
async function deleteClient(id){
  const u=state.users.find(x=>x.id===id); if(!u)return;
  if(!confirmLocalized(`Delete client login "${u.name}"? Their project data will remain, but access will be removed.`))return;
  try{ await adminDeleteRecord('client',id,''); render(); toast('Client login deleted'); }
  catch(err){ toast(err.message||'Unable to delete client'); }
}

async function deleteProject(id){
  const p=state.projects.find(x=>x.id===id); if(!p)return;
  if(!confirmLocalized(`Delete project "${p.name}" and all of its phases, photos, and expenses? This cannot be undone in this browser.`))return;
  try{
    await adminDeleteRecord('project',id,'');
    selectedProjectId=state.projects[0]?.id||null;
    render(); toast('Project deleted');
  }catch(err){ toast(err.message||'Unable to delete project'); }
}

function modal(title,body,onBind){ const wrap=document.createElement('div');wrap.className='modal-backdrop';wrap.innerHTML=`<div class="modal"><div class="modal-head"><h3>${title}</h3><button class="close" aria-label="Close">×</button></div><div class="modal-body">${body}</div></div>`;document.body.appendChild(wrap);applyLanguage(wrap);const close=()=>wrap.remove();wrap.querySelector('.close').onclick=close;wrap.onclick=e=>{if(e.target===wrap)close()};onBind?.(wrap,close); }

function openClientModal(user=null){
  const editing=!!user;
  const assigned=new Set(user?.projectIds||[]);
  modal(editing?'Edit client login':'Create client login',`<form id="clientForm"><div class="form-grid">
    <div class="field full"><label>Client / investor name</label><input class="input" name="name" value="${attr(user?.name||'')}" required></div>
    <div class="field"><label>Email</label><input class="input" type="email" name="email" value="${attr(user?.email||'')}" required></div>
    <div class="field"><label>${editing?'New password (optional)':'Temporary password'}</label><input class="input" name="password" ${editing?'placeholder="Leave blank to keep current password"':'required'}></div>
    <div class="field full"><label>Project access</label><div class="project-check-grid">${state.projects.map(p=>`<label class="project-check"><input type="checkbox" name="projectIds" value="${p.id}" ${assigned.has(p.id)?'checked':''}><span><strong>${escapeHtml(p.name)}</strong><small>${escapeHtml(p.address)}</small></span></label>`).join('')||'<span class="muted">Create a project first, then assign access here.</span>'}</div><small class="muted">A client only sees projects checked here. Assigning a project to this client makes them the primary client for that project.</small></div>
  </div><div class="form-actions"><button class="btn btn-primary">${editing?'Save client':'Create account'}</button></div></form>`,(w,close)=>{
    w.querySelector('#clientForm').onsubmit=e=>{
      e.preventDefault(); const f=new FormData(e.target);
      const email=String(f.get('email')||'').trim();
      if(state.users.some(u=>u.id!==user?.id && u.email.toLowerCase()===email.toLowerCase())){toast('Email already exists');return}
      const projectIds=f.getAll('projectIds').map(String);
      if(editing){
        user.name=String(f.get('name')||'').trim(); user.email=email;
        const pw=String(f.get('password')||''); if(pw)user.password=pw;
        const oldIds=new Set(user.projectIds||[]);
        user.projectIds=projectIds;
        state.projects.forEach(p=>{
          if(projectIds.includes(p.id)){
            p.clientId=user.id;
            state.users.filter(u=>u.role==='client'&&u.id!==user.id).forEach(u=>u.projectIds=(u.projectIds||[]).filter(id=>id!==p.id));
          } else if(oldIds.has(p.id) && p.clientId===user.id) p.clientId='';
        });
      } else {
        const u={id:uid('u'),name:String(f.get('name')||'').trim(),email,password:String(f.get('password')||''),role:'client',projectIds};
        state.users.push(u);
        projectIds.forEach(pid=>{
          const p=state.projects.find(x=>x.id===pid); if(p)p.clientId=u.id;
          state.users.filter(x=>x.role==='client'&&x.id!==u.id).forEach(x=>x.projectIds=(x.projectIds||[]).filter(id=>id!==pid));
        });
      }
      saveState(); close(); render(); toast(editing?'Client updated':'Client account created');
    };
  });
}

function openProjectModal(p=null){ const clients=state.users.filter(u=>u.role==='client'); modal(p?'Edit project':'Create project',`<form id="projectForm"><div class="form-grid"><div class="field full"><label>Project name</label><input class="input" name="name" value="${attr(p?.name||'')}" required></div><div class="field full"><label>Project address / location</label><input class="input" name="address" value="${attr(p?.address||'')}" required></div><div class="field"><label>Client account</label><select class="select" name="clientId"><option value="">Unassigned</option>${clients.map(u=>`<option value="${u.id}" ${p?.clientId===u.id?'selected':''}>${escapeHtml(u.name)}</option>`).join('')}</select></div><div class="field"><label>Status</label><select class="select" name="status">${['Pre-Construction','In Construction','Punch List','Complete'].map(x=>`<option ${p?.status===x?'selected':''}>${x}</option>`).join('')}</select></div><div class="field"><label>Start date</label><input class="input" type="date" name="start" value="${p?.start||''}" required></div><div class="field"><label>Target completion</label><input class="input" type="date" name="target" value="${p?.target||''}" required></div><div class="field"><label>Total budget</label><input class="input" type="number" name="budget" value="${p?.budget||0}" required></div><div class="field"><label>Invested to date</label><input class="input" type="number" name="invested" value="${p?.invested||0}" required></div><div class="field"><label>Completion %</label><input class="input" type="number" min="0" max="100" name="completion" value="${p?.completion||0}" required></div><div class="field full"><label>Project summary</label><textarea class="textarea" name="summary">${escapeHtml(p?.summary||'')}</textarea></div></div><div class="form-actions"><button class="btn btn-primary">${p?'Save changes':'Create project'}</button></div></form>`,(w,close)=>{w.querySelector('#projectForm').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);const clientId=f.get('clientId');if(p){Object.assign(p,{name:f.get('name'),address:f.get('address'),clientId,status:f.get('status'),start:f.get('start'),target:f.get('target'),budget:+f.get('budget'),invested:+f.get('invested'),completion:+f.get('completion'),summary:f.get('summary'),lastUpdate:new Date().toISOString().slice(0,10)});}else{p={id:uid('p'),name:f.get('name'),address:f.get('address'),clientId,status:f.get('status'),start:f.get('start'),target:f.get('target'),budget:+f.get('budget'),invested:+f.get('invested'),completion:+f.get('completion'),summary:f.get('summary'),lastUpdate:new Date().toISOString().slice(0,10),tasks:[],photos:[],expenses:[]};state.projects.push(p);selectedProjectId=p.id}state.users.filter(u=>u.role==='client').forEach(u=>{u.projectIds=u.projectIds.filter(id=>id!==p.id);if(u.id===clientId&&!u.projectIds.includes(p.id))u.projectIds.push(p.id)});saveState();close();render();toast(p?'Project updated':'Project created');};}); }


function normalizeHeader(v){ return String(v??'').trim().toLowerCase().replace(/[^a-z0-9]+/g,''); }
function findHeaderColumn(headers,aliases){
  const normalized=headers.map(normalizeHeader);
  for(const alias of aliases){ const i=normalized.indexOf(normalizeHeader(alias)); if(i>=0)return i; }
  return -1;
}
function findScheduleHeader(matrix){
  const max=Math.min(matrix.length,25);
  for(let r=0;r<max;r++){
    const row=matrix[r]||[];
    const title=findHeaderColumn(row,['Title','Phase','Task','Phase / Trade','Description','Name']);
    const start=findHeaderColumn(row,['Start','Start Date','Begin','Begin Date']);
    const end=findHeaderColumn(row,['End','End Date','Finish','Finish Date','Completion Date']);
    if(title>=0 && start>=0 && end>=0){
      return {
        rowIndex:r,title,start,end,
        id:findHeaderColumn(row,['ID #','ID','Code','Phase Code','Task ID']),
        complete:findHeaderColumn(row,['Complete','Completed','Done','Status']),
        duration:findHeaderColumn(row,['Duration','Days','Duration Days'])
      };
    }
  }
  return null;
}
function datePartsToISO(y,m,d){
  y=Number(y);m=Number(m);d=Number(d);
  if(!y||!m||!d)return '';
  if(y<100)y+=y>=70?1900:2000;
  const dt=new Date(y,m-1,d);
  if(Number.isNaN(dt.getTime()))return '';
  return `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}-${String(dt.getDate()).padStart(2,'0')}`;
}
function excelValueToISO(v){
  if(v===null||v===undefined||v==='')return '';
  if(v instanceof Date && !Number.isNaN(v.getTime())) return datePartsToISO(v.getFullYear(),v.getMonth()+1,v.getDate());
  if(typeof v==='number' && Number.isFinite(v)){
    if(window.XLSX?.SSF?.parse_date_code){ const x=XLSX.SSF.parse_date_code(v); if(x)return datePartsToISO(x.y,x.m,x.d); }
    const d=new Date(Date.UTC(1899,11,30)+Math.round(v*86400000));
    return datePartsToISO(d.getUTCFullYear(),d.getUTCMonth()+1,d.getUTCDate());
  }
  const raw=String(v).trim();
  let m=raw.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{2,4})$/);
  if(m)return datePartsToISO(m[3],m[1],m[2]);
  m=raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
  if(m)return datePartsToISO(m[1],m[2],m[3]);
  const d=new Date(raw);
  return Number.isNaN(d.getTime())?'':datePartsToISO(d.getFullYear(),d.getMonth()+1,d.getDate());
}
function addCalendarDays(iso,days){ const d=new Date(iso+'T12:00:00'); d.setDate(d.getDate()+Number(days||0)); return datePartsToISO(d.getFullYear(),d.getMonth()+1,d.getDate()); }
function parseComplete(v){
  if(v===true)return true;
  if(v===false||v===null||v===undefined||v==='')return false;
  if(typeof v==='number')return v>=1;
  return ['true','yes','y','x','complete','completed','done','100','100%'].includes(String(v).trim().toLowerCase());
}
function splitPhaseTitle(value,fallbackCode=''){
  const raw=String(value??'').trim();
  const m=raw.match(/^([A-Za-z0-9.]+)\s*[-–—]\s*(.+)$/);
  return m?{code:m[1].trim(),name:m[2].trim()}:{code:String(fallbackCode??'').trim(),name:raw};
}
function statusForImportedTask(complete,start,end){
  if(complete)return 'done';
  const today=todayISO();
  if(end && today>end)return 'overdue';
  if(start && today>=start && (!end||today<=end))return 'current';
  return 'upcoming';
}
async function parseScheduleWorkbook(file){
  if(!window.XLSX) throw new Error('Excel parser could not load. Check the internet connection and try again.');
  const buffer=await file.arrayBuffer();
  const book=XLSX.read(buffer,{type:'array',cellDates:true});
  let selected=null;
  for(const sheetName of book.SheetNames){
    const ws=book.Sheets[sheetName];
    const matrix=XLSX.utils.sheet_to_json(ws,{header:1,raw:true,defval:null,blankrows:false});
    const header=findScheduleHeader(matrix);
    if(header){ selected={sheetName,matrix,header}; break; }
  }
  if(!selected) throw new Error('No schedule table was found. The spreadsheet needs columns for Title, Start, and End. The Kairos template is supported automatically.');
  const {sheetName,matrix,header}=selected;
  const tasks=[]; let skipped=0;
  for(let r=header.rowIndex+1;r<matrix.length;r++){
    const row=matrix[r]||[];
    const rawTitle=row[header.title];
    if(rawTitle===null||rawTitle===undefined||String(rawTitle).trim()==='')continue;
    let start=excelValueToISO(row[header.start]);
    let end=excelValueToISO(row[header.end]);
    const durationRaw=header.duration>=0?Number(row[header.duration]):NaN;
    const duration=Number.isFinite(durationRaw)&&durationRaw>0?Math.round(durationRaw):0;
    if(start && !end && duration) end=addCalendarDays(start,duration-1);
    if(!start || !end){ skipped++; continue; }
    const fallbackCode=header.id>=0?row[header.id]:'';
    const phase=splitPhaseTitle(rawTitle,fallbackCode);
    if(!phase.name){ skipped++; continue; }
    const complete=header.complete>=0?parseComplete(row[header.complete]):false;
    const finalDuration=duration||daysBetweenInclusive(start,end);
    tasks.push({
      id:uid('xls'),code:phase.code,name:phase.name,category:inferPhaseCategory(phase.name,phase.code),start,end,duration:finalDuration,
      progress:complete?100:0,status:statusForImportedTask(complete,start,end),sourceRow:r+1
    });
  }
  if(!tasks.length) throw new Error('The schedule sheet was found, but no rows had both a valid Start and End date.');
  return {sheetName,tasks,skipped};
}
function scheduleTaskKey(t){ return t.code?`code:${String(t.code).trim().toLowerCase()}`:`name:${String(t.name||'').trim().toLowerCase()}`; }
function mergeScheduleTasks(existing,imported){
  const oldMap=new Map(existing.map(t=>[scheduleTaskKey(t),t]));
  const used=new Set();
  const merged=imported.map(t=>{
    const key=scheduleTaskKey(t),old=oldMap.get(key); used.add(key);
    return old?{...old,...t,id:old.id}:{...t};
  });
  existing.forEach(t=>{ const key=scheduleTaskKey(t); if(!used.has(key))merged.push(t); });
  return merged;
}
function scheduleStats(tasks){
  const dates=tasks.filter(t=>t.start&&t.end);
  const starts=dates.map(t=>t.start).sort();
  const ends=dates.map(t=>t.end).sort();
  return {
    rows:tasks.length,
    complete:tasks.filter(t=>taskStatus(t)==='done').length,
    current:tasks.filter(t=>taskStatus(t)==='current').length,
    overdue:tasks.filter(t=>taskStatus(t)==='overdue').length,
    start:starts[0]||'',end:ends[ends.length-1]||'',completion:scheduleCompletion(tasks)
  };
}
function importPreviewHtml(parsed){
  const st=scheduleStats(parsed.tasks);
  const sample=parsed.tasks.slice(0,8);
  return `<div class="import-preview-stats"><div><strong>${st.rows}</strong><span>phases found</span></div><div><strong>${st.complete}</strong><span>marked complete</span></div><div><strong>${st.completion}%</strong><span>schedule completion</span></div><div><strong>${fmtDate(st.start)}</strong><span>first phase</span></div><div><strong>${fmtDate(st.end)}</strong><span>last phase</span></div></div>
  ${parsed.skipped?`<div class="import-warning">${parsed.skipped} row${parsed.skipped===1?' was':'s were'} skipped because a valid Start and End date could not be determined.</div>`:''}
  <div class="table-wrap import-preview-table"><table class="table"><thead><tr><th>Code</th><th>Phase</th><th>Category</th><th>Start</th><th>End</th><th>Days</th><th>Status</th></tr></thead><tbody>${sample.map(t=>`<tr><td>${escapeHtml(t.code||'—')}</td><td><strong>${escapeHtml(localizedPhaseName(t.name))}</strong></td><td><span class="category-inline">${escapeHtml(taskCategory(t))}</span></td><td>${fmtDate(t.start)}</td><td>${fmtDate(t.end)}</td><td>${t.duration}</td><td>${taskStatusLabel(t)}</td></tr>`).join('')}</tbody></table></div>${parsed.tasks.length>sample.length?`<div class="muted import-more">Previewing 8 of ${parsed.tasks.length} phases.</div>`:''}`;
}
function openScheduleImportModal(){
  const p=currentProject(); if(!p)return;
  modal(`Import Excel schedule · ${escapeHtml(p.name)}`,`<form id="scheduleImportForm"><div class="import-intro"><div class="schedule-import-icon large">${svgIcon('upload')}</div><div><strong>Update this project's construction phases from Excel</strong><p>Select the spreadsheet belonging to <b>${escapeHtml(p.name)}</b>. The importer finds the schedule headers automatically, including the format in your provided template.</p></div></div>
  <div class="field"><label>Excel schedule file</label><label class="file-drop" for="scheduleFile"><span>${svgIcon('file')}</span><div><strong>Choose .xlsx or .xls file</strong><small>Expected columns: ID #, Title, Complete, Duration, Start, End</small></div><input id="scheduleFile" type="file" accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" required></label></div>
  <div class="form-grid import-options"><div class="field"><label>Import behavior</label><select class="select" id="scheduleImportMode"><option value="replace">Replace schedule with spreadsheet</option><option value="merge">Merge / update matching phase codes</option></select></div><div class="field checkbox-field"><label><input type="checkbox" id="updateProjectFacts" checked> Update project start, target completion, and completion % from spreadsheet</label></div></div>
  <div class="import-note"><strong>How it works</strong><span>The Title prefix such as <b>300- Driveway - Pouring</b> becomes phase code <b>300</b>. Each row is also auto-assigned to the broader construction category that best matches the work. Complete = TRUE becomes 100% complete. Incomplete tasks are classified as upcoming, in progress, or past due from their dates.</span></div>
  <div id="scheduleImportStatus" class="import-status muted">Choose a spreadsheet to preview the changes before importing.</div>
  <div id="scheduleImportPreview"></div>
  <div class="form-actions"><button type="button" class="btn btn-primary" id="applyScheduleImport" disabled>${svgIcon('upload')} Import schedule</button></div></form>`,(w,close)=>{
    const fileInput=w.querySelector('#scheduleFile'),status=w.querySelector('#scheduleImportStatus'),preview=w.querySelector('#scheduleImportPreview'),apply=w.querySelector('#applyScheduleImport');
    let parsed=null,file=null;
    fileInput.onchange=async()=>{
      file=fileInput.files?.[0]||null; parsed=null; apply.disabled=true; preview.innerHTML='';
      if(!file)return;
      status.className='import-status loading'; status.textContent=translateVisibleText(`Reading ${file.name}…`);
      try{
        parsed=await parseScheduleWorkbook(file);
        status.className='import-status success'; status.textContent=translateVisibleText(`Found schedule on worksheet “${parsed.sheetName}”. Review the preview below, then import.`);
        preview.innerHTML=importPreviewHtml(parsed); applyLanguage(preview); apply.disabled=false;
      }catch(err){
        status.className='import-status error'; status.textContent=translateVisibleText(err?.message||'Unable to read this spreadsheet.'); parsed=null; apply.disabled=true;
      }
    };
    apply.onclick=()=>{
      if(!parsed||!file)return;
      const mode=w.querySelector('#scheduleImportMode').value;
      p.scheduleBackup={savedAt:new Date().toISOString(),tasks:deepClone(p.tasks),start:p.start,target:p.target,completion:p.completion,status:p.status,lastUpdate:p.lastUpdate,scheduleSource:p.scheduleSource?deepClone(p.scheduleSource):null};
      p.tasks=mode==='merge'?mergeScheduleTasks(p.tasks,parsed.tasks):parsed.tasks;
      const stats=scheduleStats(p.tasks);
      if(w.querySelector('#updateProjectFacts').checked){
        if(stats.start)p.start=stats.start;
        if(stats.end)p.target=stats.end;
        p.completion=stats.completion;
        p.status=stats.completion>=100?'Complete':(p.start&&todayISO()<p.start?'Pre-Construction':'In Construction');
      }
      p.lastUpdate=todayISO();
      p.scheduleSource={fileName:file.name,sheetName:parsed.sheetName,importedAt:new Date().toISOString(),importedDate:todayISO(),rows:parsed.tasks.length,completed:parsed.tasks.filter(t=>taskStatus(t)==='done').length,mode};
      saveState(mode==='replace'?{replaceTasksFor:[p.id]}:{}); close(); render(); toast(`${parsed.tasks.length} construction phases imported`);
    };
  });
}
function undoLastScheduleImport(){
  const p=currentProject(); const b=p?.scheduleBackup; if(!p||!b)return;
  if(!confirmLocalized('Restore the project schedule to the version from before the last Excel import?'))return;
  p.tasks=deepClone(b.tasks||[]); p.start=b.start; p.target=b.target; p.completion=b.completion; p.status=b.status; p.lastUpdate=b.lastUpdate; p.scheduleSource=b.scheduleSource?deepClone(b.scheduleSource):null; delete p.scheduleBackup;
  saveState({replaceTasksFor:[p.id]}); renderView(); toast('Previous project schedule restored');
}

function openTaskModal(task=null){
  const p=currentProject(); if(!p)return;
  const editing=!!task;
  modal(editing?'Edit construction phase':'Add construction phase',`<form id="taskForm"><div class="phase-edit-note">${editing?'Changes made here update this individual phase only and sync to the assigned client.':'Add a single phase manually. Excel imports can still replace or merge the full schedule later.'}</div><div class="form-grid">
    <div class="field"><label>Phase code</label><input class="input" name="code" placeholder="e.g. 340" value="${attr(task?.code||'')}" required></div>
    <div class="field"><label>Phase / trade name</label><input class="input" name="name" value="${attr(task?.name||'')}" required></div>
    <div class="field full"><label>Broader construction category</label><select class="select" name="category">${phaseCategoryOptions(task?.category||'')}</select><small class="muted">Leave on Auto-detect to categorize from the phase name. You can override it for any individual phase.</small></div>
    <div class="field"><label>Start date</label><input class="input" type="date" name="start" value="${task?.start||''}" required></div>
    <div class="field"><label>Finish date</label><input class="input" type="date" name="end" value="${task?.end||''}" required></div>
    <div class="field"><label>Progress %</label><input class="input" type="number" min="0" max="100" name="progress" value="${Number(task?.progress)||0}" required></div>
    <div class="field"><label>Duration (days)</label><input class="input" type="number" min="1" name="duration" value="${task?Number(task.duration)||daysBetweenInclusive(task.start,task.end):''}" placeholder="Calculated from dates"></div>
    <div class="field"><label>Responsible trade / contractor</label><input class="input" name="trade" value="${attr(task?.trade||'')}" placeholder="Optional"></div>
    <div class="field full"><label>Phase notes</label><textarea class="textarea" name="notes" placeholder="Optional investor-facing update or admin note">${escapeHtml(task?.notes||'')}</textarea></div>
  </div><div class="form-actions"><button class="btn btn-primary">${editing?'Save phase changes':'Add phase'}</button></div></form>`,(w,close)=>{
    w.querySelector('#taskForm').onsubmit=e=>{
      e.preventDefault(); const f=new FormData(e.target);
      const prog=Math.max(0,Math.min(100,+f.get('progress')||0)),start=f.get('start'),end=f.get('end');
      if(start && end && end<start){toast('Finish date cannot be before the start date');return}
      const duration=Math.max(1,+f.get('duration')||daysBetweenInclusive(start,end));
      const code=String(f.get('code')||'').trim(),name=String(f.get('name')||'').trim();
      const category=String(f.get('category')||'').trim() || inferPhaseCategory(name,code);
      const values={code,name,category,start,end,duration,progress:prog,trade:String(f.get('trade')||'').trim(),notes:String(f.get('notes')||'').trim(),status:prog===100?'done':prog>0?'current':statusForImportedTask(false,start,end)};
      if(editing)Object.assign(task,values); else p.tasks.push({id:uid('t'),...values});
      p.tasks.sort((a,b)=>(a.start||'9999').localeCompare(b.start||'9999') || String(a.code||'').localeCompare(String(b.code||'')));
      p.completion=scheduleCompletion(p.tasks); p.lastUpdate=todayISO(); saveState(); close(); renderView(); toast(editing?'Phase updated':'Phase added');
    };
  });
}

function openPhotoModal(photo=null){
  const p=currentProject(); if(!p)return;
  const editing=!!photo;
  const phaseOptions=p.tasks.map(t=>t.name).filter(Boolean);
  const existingSize=photo?.optimizedBytes||photo?.bytes||0;
  modal(editing?'Edit project photo':'Add project photo',`<form id="photoForm"><div class="form-grid">
    ${editing&&photo.url?`<div class="field full"><label>Current image</label><img class="modal-photo-preview" src="${photo.url}" alt=""></div>`:''}
    <div class="field full"><label>Photo title</label><input class="input" name="title" value="${attr(photo?.title||'')}" required></div>
    <div class="field"><label>Date</label><input class="input" type="date" name="date" value="${photo?.date||todayISO()}" required></div>
    <div class="field"><label>Project phase</label><input class="input" name="phase" list="phaseNames" value="${attr(photo?.phase||'')}" placeholder="Framing, HVAC, Exterior…"><datalist id="phaseNames">${phaseOptions.map(x=>`<option value="${attr(x)}"></option>`).join('')}</datalist></div>
    <div class="field full"><label>${editing?'Replace image (optional)':'Image file'}</label><input class="input" type="file" name="file" accept="image/jpeg,image/png,image/webp,image/*" ${editing?'':'required'}>
      <small class="muted">${editing?'Leave empty to keep the current image. ':''}Kairos automatically resizes and compresses each upload to WebP when supported. The target is about 350 KB per photo, with a 1,600 px maximum edge and a quality floor designed to keep construction details clear.${existingSize?` Current optimized size: <b>${humanBytes(existingSize)}</b>.`:''}</small>
    </div>
    <div class="field full"><div id="photoOptimizeStatus" class="photo-optimize-status"><span class="photo-opt-dot"></span><span>Select a photo to see its storage optimization.</span></div></div>
  </div><div class="form-actions"><button class="btn btn-primary" id="photoSaveBtn">${editing?'Save photo':'Optimize & upload photo'}</button></div></form>`,(w,close)=>{
    const form=w.querySelector('#photoForm'),fileInput=form.querySelector('[name="file"]'),status=w.querySelector('#photoOptimizeStatus'),saveBtn=w.querySelector('#photoSaveBtn');
    let optimized=null,optimizedFileKey='';
    const setStatus=(message,kind='')=>{status.className=`photo-optimize-status ${kind}`;status.innerHTML=`<span class="photo-opt-dot"></span><span>${message}</span>`;applyLanguage(status);};
    fileInput.onchange=async()=>{
      const file=fileInput.files?.[0]||null;optimized=null;optimizedFileKey='';
      if(!file){setStatus(editing?'No replacement selected; the existing image will be kept.':'Select a photo to see its storage optimization.');return;}
      setStatus(`Original: ${humanBytes(file.size)}. Ready to optimize when you save.`,'ready');
    };
    form.onsubmit=async e=>{
      e.preventDefault();
      const f=new FormData(form),file=f.get('file');
      saveBtn.disabled=true;
      try{
        if(file&&file.size){
          const key=`${file.name}|${file.size}|${file.lastModified}`;
          if(!optimized||optimizedFileKey!==key){
            optimized=await optimizeProjectPhoto(file,msg=>setStatus(escapeHtml(msg),'working'));optimizedFileKey=key;
          }
          const reduction=Math.max(0,Math.round((1-optimized.bytes/Math.max(1,optimized.originalBytes))*100));
          setStatus(`Optimized ${humanBytes(optimized.originalBytes)} → <b>${humanBytes(optimized.bytes)}</b> (${reduction}% smaller) · ${optimized.width}×${optimized.height}`,'success');
        }
        const values={
          title:String(f.get('title')||'').trim(),date:String(f.get('date')||''),phase:String(f.get('phase')||'').trim(),
          url:optimized?.url||photo?.url||'',mime:optimized?.mime||photo?.mime||'',optimizedBytes:optimized?.bytes||photo?.optimizedBytes||photo?.bytes||0,
          originalBytes:optimized?.originalBytes||photo?.originalBytes||0,width:optimized?.width||photo?.width||0,height:optimized?.height||photo?.height||0,
          originalName:optimized?.originalName||photo?.originalName||''
        };
        if(!values.url)throw new Error('Choose a photo to upload.');
        if(editing)Object.assign(photo,values); else p.photos.push({id:uid('ph'),...values});
        p.lastUpdate=todayISO();
        await saveState();
        close(); renderView(); toast(editing?'Photo updated and optimized':'Photo optimized and uploaded');
      }catch(err){
        setStatus(escapeHtml(err?.message||'Unable to optimize this photo.'),'error');
        toast(err?.message||'Unable to upload photo');
      }finally{saveBtn.disabled=false;}
    };
  });
}

function openExpenseModal(expense=null){
  const p=currentProject(); if(!p)return;
  const editing=!!expense;
  const oldAmount=editing?(Number(expense.amount)||0):0;
  modal(editing?'Edit project expense':'Add project expense',`<form id="expenseForm"><div class="expense-budget-note"><strong>Automatic financial update + client approval</strong><span>${editing?'Changing this amount adjusts':'Adding this expense increases'} both <b>Approved Project Budget</b> and <b>Invested to Date</b>${editing?' by the amount difference':''}. ${p.clientId?'The assigned client will receive a portal notification to Approve or Not approve this expense. Editing a previously decided expense requests approval again.':'Assign a client to this project to enable approval notifications.'}</span></div><div class="form-grid">
    <div class="field"><label>Category</label><input class="input" name="cat" value="${attr(expense?.cat||'')}" placeholder="Windows / Exterior" required></div>
    <div class="field"><label>Amount</label><input class="input" type="number" name="amount" min="0" step="0.01" value="${expense?.amount??''}" required></div>
    <div class="field"><label>Date</label><input class="input" type="date" name="date" value="${expense?.date||todayISO()}"></div>
    <div class="field"><label>Vendor / payee</label><input class="input" name="vendor" value="${attr(expense?.vendor||'')}" placeholder="Contractor or supplier"></div>
    <div class="field full"><label>Notes</label><textarea class="textarea" name="notes" placeholder="Invoice, draw, scope, or payment note">${escapeHtml(expense?.notes||'')}</textarea></div>
  </div><div class="form-actions"><button class="btn btn-primary">${editing?'Save expense & request approval':'Add expense & request approval'}</button></div></form>`,(w,close)=>{
    w.querySelector('#expenseForm').onsubmit=async e=>{
      e.preventDefault(); const f=new FormData(e.target);
      const values={cat:String(f.get('cat')||'').trim(),amount:+f.get('amount')||0,date:String(f.get('date')||''),vendor:String(f.get('vendor')||'').trim(),notes:String(f.get('notes')||'').trim()};
      let target=expense;
      if(editing){ Object.assign(target,values); }
      else { target={id:uid('ex'),...values}; p.expenses.push(target); }
      const delta=values.amount-oldAmount;
      applyExpenseFinancialDelta(p,delta);
      const requested=requestExpenseApproval(p,target,{edited:editing});
      addExpenseHistory(p,{expenseId:target.id,action:editing?'Expense updated — approval requested':requested?'Expense added — approval requested':'Expense added',category:target.cat,amount:target.amount,status:target.approvalStatus,details:target.vendor||''});
      await saveState(); close(); renderView(); toast(requested?(editing?'Expense updated; client approval requested':'Expense added; client notified for approval'):(editing?'Expense updated':'Expense added'));
    };
  });
}

async function refreshClientState(forceRender=false){
  if(!session?.token||currentUser()?.role!=='client'||document.hidden)return;
  const before=pendingApprovalCount();
  try{const result=await apiJson('/api/state',{method:'GET'});state=normalizeState(result.state);saveLocalState();const after=pendingApprovalCount();if((forceRender||before!==after)&&!document.querySelector('.modal-backdrop,.photo-lightbox'))render();}catch(err){if(err.status===401){session=null;sessionStorage.removeItem(SESSION_KEY);render();}}
}

function escapeHtml(s=''){ return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function attr(s=''){ return escapeHtml(s); }

setInterval(()=>refreshClientState(false),30000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)refreshClientState(true);});
boot();

function buildertrendPanel(){
 const pt=currentLanguage==='pt';
 return `<div class="card" style="margin-top:18px;padding:24px"><h3>Buildertrend</h3><p>${pt?'Captura somente leitura. Veja abaixo cronogramas, valores, faturas, diários e prévias de fotos importados.':'Read-only capture. View imported schedules, finances, invoices, logs and photo previews below.'}</p><button class="btn btn-primary" id="btRefresh">${pt?'Atualizar do Buildertrend':'Refresh from Buildertrend'}</button> <button class="btn btn-outline" id="btStatus">${pt?'Verificar status':'Check status'}</button> <button class="btn btn-outline" id="btDownload">${pt?'Baixar captura':'Download capture'}</button><button class="btn btn-outline" id="btInspect">${pt?'Ver dados importados':'View imported data'}</button><p id="btMessage" role="status"></p><div id="btImported"></div></div>`;
}
function bindBuildertrend(){
 const refresh=document.getElementById('btRefresh'); if(!refresh)return;
 const message=document.getElementById('btMessage');
 const show=async()=>{try{const r=await apiJson('/api/buildertrend/status');message.textContent=JSON.stringify(r);}catch(e){message.textContent=e.message;}};
 refresh.onclick=async()=>{refresh.disabled=true;try{await apiJson('/api/buildertrend/refresh',{method:'POST',body:'{}'});await show();}catch(e){message.textContent=e.message;}finally{refresh.disabled=false;}};
 document.getElementById('btStatus').onclick=show;
 document.getElementById('btInspect').onclick=async()=>{try{const r=await apiJson('/api/buildertrend/snapshot');document.getElementById('btImported').innerHTML=buildertrendImported(r);}catch(e){message.textContent=e.message;}};
 document.getElementById('btDownload').onclick=async()=>{try{const r=await apiJson('/api/buildertrend/snapshot');const u=URL.createObjectURL(new Blob([JSON.stringify(r,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=u;a.download='buildertrend-capture.json';a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);}catch(e){message.textContent=e.message;}};
 show();
}

function buildertrendImported(snapshot){
 const pt=currentLanguage==='pt', esc=escapeHtml;
 if(snapshot.schemaVersion!==2)return `<p>${pt?'Execute uma atualização com o worker v1.11.':'Run a refresh with the v1.11 worker.'}</p>`;
 const table=rows=>`<div class="table-wrap"><table class="table"><tbody>${rows.map(row=>`<tr>${row.map(v=>`<td>${esc(String(v??''))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
 return Object.values(snapshot.projects||{}).map(p=>{
 const sections=p.sections||{}, f=sections.summary?.fields||{};
 const labels=pt?['Preço revisado','Preço original','Imposto','Total pago','Saldo do contrato','Próximo pagamento']:['Revised price','Original price','Tax','Total paid','Remaining contract balance','Next payment'];
 const amounts=[f.revisedPrice,f.originalPrice,f.tax,f.totalPaid,f.remainingToPay];
 const summary=table(labels.map((label,i)=>[label,i<5?money(amounts[i]):f.nextPaymentText]));
 const schedule=table([[pt?'Título':'Title',pt?'Concluído':'Complete',pt?'Duração':'Duration',pt?'Início':'Start',pt?'Fim':'End'],...(sections.schedule?.records||[]).map(x=>[x.title,x.completed===null?'—':x.completed?(pt?'Sim':'Yes'):(pt?'Não':'No'),x.duration,x.startDate,x.endDate])]);
 const invoices=table([['ID',pt?'Título':'Title',pt?'Status':'Status',pt?'Valor':'Amount',pt?'Pago':'Paid',pt?'Saldo da fatura':'Invoice balance',pt?'Vencimento':'Due'],...(sections.invoices?.records||[]).map(x=>[x.customId,x.title,x.paymentStatus,x.invoiceAmount,x.amountPaid,x.invoiceBalance,x.deadline])]);
 const logs=table([[pt?'Data':'Date',pt?'Autor':'Author',pt?'Notas':'Notes'],...(sections.dailyLogs?.records||[]).map(x=>[x.dateLabel,x.author,x.notes])]);
 const photos=(sections.photos?.records||[]).map(x=>{let href='';try{const u=new URL(x.previewUrl);if(u.protocol==='https:'&&u.hostname==='buildertrend.net')href=u.href;}catch{}return `<div style="padding:8px"><strong>${esc(x.name)}</strong><p>${esc(x.details)}</p>${href?`<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${pt?'Abrir prévia no Buildertrend':'Open preview in Buildertrend'}</a>`:''}</div>`;}).join('');
 return `<section style="margin-top:20px"><h3>${esc(p.name)} · Buildertrend ${esc(p.sourceId)}</h3><p>${pt?'Dados importados separados dos registros manuais do Kairos. Filtros ativos no Buildertrend podem limitar os resultados.':'Imported data is displayed alongside your manual Kairos records. Active Buildertrend filters may limit results.'}</p>${[['summary',pt?'Finanças':'Finances',summary],['schedule',pt?'Cronograma':'Schedule',schedule],['invoices',pt?'Faturas':'Invoices',invoices],['dailyLogs',pt?'Diários':'Daily logs',logs],['photos',pt?'Prévias de fotos':'Photo previews',photos]].map(([key,label,html])=>`<details style="margin:12px 0"><summary>${label}${sections[key]?.records?' ('+sections[key].records.length+')':''}</summary><p>${esc(sections[key]?.coverage||'')}</p>${html}</details>`).join('')}</section>`;
 }).join('');
}
