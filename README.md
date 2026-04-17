# Rehabtrack

Aplicação web de acompanhamento de recuperação motora, que liga doentes em processo de reabilitação aos seus fisioterapeutas através de uma plataforma digital única.

## Porque é que isto existe

A reabilitação motora é um processo longo, muitas vezes solitário, e onde a adesão aos planos de exercícios em casa é um dos maiores desafios enfrentados pelos profissionais de saúde. Os doentes ficam sem orientação entre consultas, os terapeutas perdem visibilidade sobre o progresso real, e o resultado é uma recuperação mais lenta do que podia ser.

O Rehabtrack nasceu para fechar essa lacuna — dar aos doentes uma ferramenta que os acompanha no dia a dia, e aos fisioterapeutas uma visão clara do progresso dos seus pacientes entre sessões presenciais.

## Para quem é

**Doentes em recuperação motora** — acesso a planos de exercícios personalizados, registo de sessões feitas em casa, e acompanhamento visual do seu próprio progresso.

**Fisioterapeutas e profissionais de saúde** — criação e ajuste de planos de reabilitação, monitorização à distância, e dados concretos para tomar decisões clínicas melhor fundamentadas.

## Contexto académico

Este projeto foi desenvolvido no âmbito da unidade curricular de **Tecnologias para a Web e Dispositivos Móveis**, como trabalho de grupo. O foco principal foi o desenvolvimento **frontend**, explorando integração com múltiplas APIs externas e consumo de dados em tempo real.

## Arquitetura

A aplicação é essencialmente uma **single-page application** que consome dois serviços distintos:

### Supabase (API personalizada)

Backend-as-a-service usado para toda a lógica específica da aplicação:

- Autenticação de utilizadores (doentes e profissionais)
- Gestão de perfis e permissões distintas por tipo de utilizador
- Planos de reabilitação personalizados
- Registo de sessões feitas pelos doentes
- Histórico e progresso ao longo do tempo

### API Ninjas — Exercises

API pública usada para popular o catálogo de exercícios disponíveis:

- Biblioteca de exercícios físicos categorizados
- Filtragem por grupo muscular, tipo e dificuldade
- Instruções detalhadas para cada exercício

Esta arquitetura separa claramente os **dados genéricos** (catálogo de exercícios vindo de uma fonte externa) dos **dados específicos da aplicação** (utilizadores, planos, progresso — geridos pela Supabase).

## Funcionalidades principais

- Autenticação diferenciada para doentes e fisioterapeutas
- Pesquisa e filtragem de exercícios via API Ninjas
- Criação de planos personalizados pelos fisioterapeutas
- Registo de sessões e exercícios realizados pelos doentes
- Dashboard de progresso com visualização de dados
- Interface responsiva adaptada a diferentes dispositivos

## Stack técnico

- **Frontend**: *React*
- **Backend-as-a-Service**: Supabase 
- **API externa**: [API Ninjas — Exercises](https://api-ninjas.com/api/exercises)


## Desafios técnicos interessantes

- **Orquestração de duas APIs distintas** no mesmo fluxo de utilizador — combinar dados da API Ninjas (exercícios) com dados da Supabase (planos personalizados) de forma coerente
- **Gestão de estado diferenciado** para dois tipos de utilizadores com permissões e vistas distintas
- **Design responsivo** para uma aplicação que tanto pode ser usada numa consulta de fisioterapia como em casa pelo doente

## Equipa

Projeto desenvolvido em grupo no âmbito da UC de Tecnologias para a Web e Dispositivos Móveis.

*Tiago Sanina e Miguel Sanina*

## Estado atual

Projeto académico entregue como parte da avaliação da unidade curricular.

---

*Projeto desenvolvido na Unidade Curricular de Tecnologias para a Web e Dispositivos Móveis.*
