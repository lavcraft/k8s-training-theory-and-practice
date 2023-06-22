---js
{
name: 'K8S - Helm',
order: 30,
helmRepositoryUrl: { value: 'artifactory.raiffeisen.ru/artifactory/ext-rbru-container-community-virtual-helm/', description: 'Helm repository url' },
}
---

Kubernetes Helm
=================
4 часов, 1 ак. дня.

Prerequisites
=============

1. RAM ≥ 8Gb
1. [Пройденыне задание с тренига по Docker](#link-to-docker-part)
1. [Пройденыне задание с тренига по K8S-CORE](#link-to-docker-part)
1. [Развёрнутый кластер k8s на пару](#link-to-confluence)
1. terminal
1. kubectl cli


K8S Helm charts introduction
----------------------------

1. Для чего придуман, предпосылки
1. Предпосылки к появлению. Отсылки к kustomize.io.
1. Что было "ДО"
1. Версии Helm Charts
1. Демо - объединение наработок по `app-butter` и `app-knife` для управления из одной "папки"
1. Связь с multi service deploy и управление группой ресурсов как одной сущностью
1. Сторонние Helm и их поддержка/обновление

:eyes: [Совместимость версий Helm/Kubectl](https://helm.sh/docs/topics/version_skew/)

## Hands-on practice quest #00: Установка и настройка

Проверяем наличие необходимых команд и настраиваем доступ к пакетам Helm

**Given** пары участников залогинены на `bastion` и выполнили `BASE` части  
**When** участники исследуют утилиту helm и выполняют задание  
**Задание**: настроить окружение для работы с helm

```shell
which helm
sudo yum install helm

helm completion -h
helm repo list
helm search hub
helm search repo
```

**Then** участники делятся возникшими и решенными проблемами и отвечают на вопросы
1. Что выводят `helm repo list` и `helm search repo` и в чём отличие?
1. Что выводит `helm search hub` и почему?
1. **Доп задание**\*: куда и как нужно добавить результат работы команды `helm completion bash` чтобы сохранить автодополнение между shell сессиями?
1. **Доп задание**\*: попробуйте установить redis с помощью Helm (используйте команды helm search repo/hub чтобы найти и helm install чтобы установить)

**Задание**: настроить внутренний репозиторий

```shell
# добавляем наши репозитории в helm
helm repo add -h
helm repo add ext-rbru-container-community-virtual-helm "https://{{helmRepositoryUrl}}" --username "$USER"
helm repo update
helm repo list
helm search repo
```

**Then** участники делятся возникшими и решенными проблемами и отвечают на вопросы
1. Helm работает на нашей стороне или в кластере K8S?
1. Что лучше, ввод пароля интерактивно или с помощью флага `--password` при добавлении репозитория?
1. Видны ли в списке доступных чартов названия чартов? Попробуйте исправить, какие есть варианты?
1. **Доп задание**\*: как избежать добавления чувствительных к безопасности команд в историю команд? (bash_history)
1. **Доп задание**\*: Как поискать от имени другого пользователя? (например если у вас имеется привилегированный пользователь)

```shell
# * Дополнительное задание. Попробуйте установить helm chart из репозитория (например для filebeat или redis)
```

**Then** участники делятся возникшими и решенными проблемами и отвечают на вопросы
1. Возникли ли какие-то сложности?
1. Объясните их природу
1. **Доп задание**\*: Найдите где Helm хранит свои настройки и посмотрите. Всё ли вам нравится?

:eyes: [Основы Helm Templates](https://helm.sh/docs/chart_best_practices/templates/#helm)  
:eyes: [Helm соглашения о именовании переменных values.yml](https://helm.sh/docs/chart_best_practices/values/)  
:eyes: [Helm Crate gettings started](https://helm.sh/docs/chart_template_guide/getting_started/)  
:eyes: [Helm Tests](https://helm.sh/docs/topics/chart_tests/)

Hands-on practice quest #01: создание Helm Chart
------------------------------------------------

**Given** пары участников залогинены на `bastion` и выполнили задания предыдущей части  
**When** участники пользуются утилитой helm для объединения K8S абстракций из первой части тренинга  
**Задание**: создать шаблон Helm chart с помощью консольной утилиты `helm` и установить релиз этого чарта в kubernets

```shell
# выбираем директорию где будем делать новый helm chart
mkdir -p handson/handson-helm-01/
cd handson/handson-helm-01/
helm create -h
helm create
cd <>
ls -la
cat Chart.yml
ls templates
```

:eyes: [Helm Crate gettings started](https://helm.sh/docs/chart_template_guide/getting_started/)

**Then** участники делятся возникшими и решенными проблемами и отвечают на вопросы
1. знакомо ли вам то, что находит в директории templates?
1. почему в Chart.yml указано две версии? `version` и `appVersion`?
1. на версию чего указывает `apiVersion`? Как с этим связан K8S?
1. **Доп задание**\*: Посмотрите что находится в файлах в директории `templates` и `tests`. Найдите на что ссылаются переменные в этих файлах

**Задание**: кастомизировать имя и версию Helm Chart нашего приложения `sandwich-fabric`

```shell
vi Chart.yaml
vi values.yaml
# WARN: сохраните или сделайте helm create в другой папке чтобы обращаться к стандартным шаблонам как к примерам
rm -rf templates/*.yaml

helm install -h
helm install <helm_chart_name> <helm_chart_dir>
helm list
```

**Then** участники делятся возникшими и решенными проблемами и отвечают на вопросы
1. какие трудности возникли при установке? Как бы вы их решали?
1. откуда `helm list` берёт список установленных helm charts?
1. что будет если установить несколько раз?

K8S Helm charts
---------------
1. Структура HELM Charts
1. команды helm и templates
1. определение переменных для деплоя нашего приложения с помощью helm

:eyes: [Именованные шаблоны](https://helm.sh/docs/chart_template_guide/named_templates/)  
:eyes: [Функции шаблона и их комбинирование](https://helm.sh/docs/chart_template_guide/functions_and_pipelines/)

Hands-on practice quest #02: структура и шаблон. Начинаем переносить deployment
-------------------------------------------------------------------------------
**Given** пары участников залогинены на `bastion` и создали шаблон helm chart  
**When** участники пользуются утилитой helm для объединения K8S абстракций из первой части тренинга  
**Задание**: Перенесите deployment `app-knife` и `app-butter` в helm шаблон

```shell
ls -la templates
vi templates/deployment.yaml

helm install sandwich-fabric .
```

**Then** участники делятся возникшими и решенными проблемами и отвечают на вопросы
1. Какие возникли сложности? Объясните их?
1. как посмотреть на то что будет установленно без установки?
1. можно ли посмотреть только на конкретный шаблон?
1. **Доп задание**\*: Что будет если запустить helm install несколько раз с одним именем?
1. **Доп задание**\*: как версионировать helm charts?


K8S Helm charts шаблонизирование
--------------------------------

1. Go-Template и его функции
1. Helm CLI устройство
1. Мета информация в шаблоне и использование примеров

:eyes: [Debug helm chars](https://helm.sh/docs/chart_template_guide/debugging/)

Hands-on practice quest #03: функции шаблонизации и deployment
--------------------------------------------------------------
**Given** пары участников залогинены на `bastion` и развернули deployment sandwich-fabric с помщью helm  
**When** участники пользуются утилитой helm для объединения K8S абстракций из первой части тренинга  
**Задание**: добавьте путь к image repository в настройки helm и проверить получаемый шаблон

```shell
helm upgrade -h
helm template <> . -s templates/deployment.taml

# Добавим 
# image:
#   repository: '...'
#
vi values.yaml
# используем image.repository в шаблоне. * попробуйте сразу добавить значение по умолчанию на уровне шаблона
vi templates/deployments.yml
helm upgrade <> .
```

**Доп задание**\* Задание: добавьте автоматическое экранирование `image.repository` в шаблон

**Given** пары участников залогинены на `bastion` и развернули deployment sandwich-fabric с помщью helm  
**When** участники пользуются утилитой helm для объединения K8S абстракций из первой части тренинга
1. Что будет если не прописывать в values.yaml `image.repository?` Попробуйте

K8S Helm charts как пакетный менеджер для K8S
---------------------------------------------

1. Роль пакетных менеджеров для платформ
1. Откуда растут ноги у Helm (Bitnami)
1. HELM Chart как API для развёртывания комплексных решений в K8S

:eyes: [Список вспомогательных функций шаблонизации](https://helm.sh/docs/chart_template_guide/function_list/)

Hands-on practice quest #04: добавляем дефолтные значения в шаблон и мигрируем ingress
--------------------------------------------------------------------------------------
**Given** пары участников залогинены на `bastion` и развернули deployment sandwich-fabric с помощью helm  
**When** участники пользуются утилитой helm для объединения K8S абстракций из первой части тренинга  
**Задание**: Перенесите ingress с кастомизируемым правилом host. Добавьте путь к `ingress.host` в настройки helm

```shell
# Добавим в начало 
# ingress:
#   host: '...'
#
vi values.yaml
# попробуйте сразу экранировать кавычками значение host
vi templates/ingress.yml
helm upgrade <> .
```

**Then** участники делятся возникшими и решенными проблемами и отвечают на вопросы
1. Как проверить значение заэкранировалось и подставляется?
1. Получилось обновить приложение? Как были трудности?
1. **Доп задание**\* добавьте экранирование кавычками для значения `ingress.host` в шаблон

**Задание**: Перенесите service `app-knife` и `app-butter` в helm шаблон

```shell
vi values.yaml
vi templates/services.yml
helm upgrade <> .
```

**Then** участники делятся возникшими и решенными проблемами и отвечают на вопросы
1. проверьте работоспособность ingress
1. зачем экранировать значения?
1. что будет если в values два раза указать `ingress: ..` ?
1. **Доп задание**\*: сделайте для `image.repository` и дефолтное значение и экранирование в шаблоне deployment
1. **Доп задание**\*: перенесите `ConfigMaps` и `Secrets` из прошлых заданий в Helm

## K8S Helm Hub

1. О Hub и как искать helm charts
1. О релизном цикле helm charts
1. Про multi service deployment

:eyes: [Helm Hooks](https://helm.sh/docs/topics/charts_hooks/)  
:eyes: [Helm Architecture](https://helm.sh/docs/topics/architecture/)

Hands-on practice quest #4.1: задаём вопросы и доделываем то что не успели
--------------------------------------------------------------------------

**Then** участники подводят итоги и отвечают на контрольные вопросы
1. что будет если несколько раз запустить helm install? Безопасное ли это поведение?
1. какие версии у задеплоенных helm chart и приложения?
1. кто обновляет версии?
1. где хранятся эти версии?
1. как их посмотреть?
1. как сделать дефолтные значения для переменных шаблона?
1. как откатить helm?
1. как `helm` связан с `kubectl`?
1. можно ли и как с помощью Helm создать namespace?

K8S Helm Homework
-----------------

**Задание**: Попробуйте попрактиковаться и применить полученные навыки для переноса оставшихся ресурсов в helm chart
- ConfigMaps
- Secrets
- LimitRanges
- CronJobs

**Доп задание**\*: Самостоятельно разберитесь с Helm test и интегрируйте тест из CronJob в Helm chart
**Доп задание**\*: Соберие helm пакет (`helm package`) и задеплойте его в тренировочный репозиторий artifactory. После установите его в кластер (curl/jfrog cli/artifactory web)