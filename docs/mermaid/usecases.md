```mermaid
actor Paciente
actor Profissional
actor Administrador
actor Sistema as S

Paciente --> (Registrar / Login)
Paciente --> (Visualizar Perfil)
Paciente --> (Agendar / Cancelar Consulta)
Paciente --> (Acessar Teleconsulta)
Paciente --> (Visualizar Histórico Clínico)

Profissional --> (Login)
Profissional --> (Gerenciar Agenda)
Profissional --> (Atualizar Prontuário)
Profissional --> (Emitir Receita Digital)
Profissional --> (Atender Teleconsulta)

Administrador --> (Login)
Administrador --> (Gerenciar Usuários)
Administrador --> (Gerenciar Unidades e Leitos)
Administrador --> (Gerar Relatórios)
Administrador --> (Gerar Relatórios Horários)

(Agendar / Cancelar Consulta) <-- (Gerenciar Agenda)
(Atender Teleconsulta) <-- (Acessar Teleconsulta)
(Gerar Relatórios Horários) <-- S
(Gerar Relatórios) <-- S

note right of (Gerar Relatórios Horários)
  Relatórios periódicos (ex.: por hora)
  para monitoramento de carga/ocupação.
end note
```