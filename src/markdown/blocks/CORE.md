---js
{
name: 'K8S - Core',
order: 10,
dockerRepository: { value: 'docker.mycompany.com', description: 'Your company private registry address. Like docker.mycompany.com' }, 
materialsRepository: { value: 'https://github.com/lavcraft/k8s-training-demo-apps', description: 'Repository with handson materials and demo app sources' },
sharedDockerImageName: { value: 'shared-company-repository/busybox', description: 'Docker image for debug purposes, it should be accessible without password from dockerRepository' }, 
privateDockerImageName: { value: 'private-company-repository/cli-tools', description: 'Docker image for debug purposes, it should be accessible via full auth from dockerRepository and contain nslookup, curl and dig utilities' },
ingressTemplate: { value: '.<namespace-name>.lb.<cluster-name>.k8s.local', description: 'Your company ingress template conventions for easy create and access from trust network' },
}
---

Intro to Kubernetes
===================
8-12 часов, 2-3 ак. дня.

Prerequisites
=============

1. RAM ≥ 8Gb
1. [Пройденыне задание с тренига по Docker](#link-to-docker-part)
1. [Развёрнутый кластер k8s на пару](#link-to-confluence)
1. terminal
1. kubectl cli

Core - Program
==============
Программа содержит практические задания и материалы для знакомства с основами работы K8S 
и получения навыков по работе с типичными приложениями внутри кластера.
Программа сфокусировано на надёжности и поддержке софта внутри кластера. 

- что такое приложения внутри K8S
- чем отличается от обычного
- философия K8S и подходы к управлению инфраструктурой
- надёжность работы приложений и вариативность компонент K8S

Введение в K8S
-----------------

1. Зачем нужен K8S? Функции и зачем нам оркестрация.
1. Процесс ОС "на стероидах": в чём отличие от локального запуска, что K8S делает за меня?
1. Метафора морского порта
1. Текущее состояние дел K8S и направление развития
1. Парадигма Cloud Native (DevOps+CI/CD+Microservices+Containers) приложений (отсылки к тренингу по Docker и 12
  factor apps)
1. K8S и приложения - Capabilities (Self-Service, API-Driven, Elastic)
1. Основные компоненты и с чем мы будем работать на этом тренинге
    - `ssh`
    - `kubectl`
    - linux shell (`bash` or `zsh`)
    - `curl`
    - `watch`
    - `nslookup/dig`
1. **Демо**. CLI и настройки доступа к кластеру

Hands-on practice quest #00: requisites check and compatibility check
---------------------------------------------------------------------
Проверяем окружение в котором будем работать и настраиваем инструменты для комфортабельной работы
* наличие kubectl - с ним будем работать в течении всего курса, наш основной инструмент
* [optional] docker - нужен/пригодится для сборки демо приложений если хочется эксперементировать с приложениями собственаручно

**Given** сформированы пары участников и в систему установлены все утилиты.
> С установкой поможет [Инструкция по настройке RHEL подобных систем](SETUP)

**When** участники используют команды и проанализируют их вывод и поведение

```shell script
kubectl

# optional. Need for rebuild demo apps
#docker version
# optional. Need for configure secrets from docker config istead of raw secret creation
#docker login https://{{dockerRepository}}
```

```shell script
# выведем "спецификацию" для авто комплита
kubectl completion bash
# применим её
source <(kubectl completion bash)
```

```shell script
ls -la ~/.kube
kubectl cluster-info
```

```shell script
git clone {{materialsRepository}}
```

**Then** участники делятся возникшими и решенными проблемами и отвечают на вопросы
- Какая версия kubernetes кластера у вас?
- Какая версия kubectl нужна для установленного кластера?
- Какие версии kubectl совместимы с какими версиями кластера?
- Откуда берётся папка `~/.kube` ?
- Есть ли разница в какой оболочке запускать команды? BASH/ZSH/FISH/ETC
- **Задание**\*: Написать config для kubernetes с разными контекстами - prod/dev (смотрят на разные namespace в нашем случае. dev - ваш неймспейс. prod - любой другой неймспейс)
- [Enable kubectl completion howto](https://kubernetes.io/docs/tasks/tools/included/optional-kubectl-configs-bash-linux/#enable-kubectl-autocompletion)

K8S Authentication
------------------
1. K8S _Реализации_ - PKS/TKGI/Cloud
1. Как управлять кластерами? CLI or GUI ?
1. kubectl CLI и много кластеров. Как понять где себя обслужить
1. kubectl config get-contexts
1. tkgi cli

Hands-on practice quest #01: connect to existed cluster
-------------------------------------------------------
Настраиваем и проверяем подключение к кластеру K8S

**Given** пары участников  
**When** участники используют команды для извлечения информации из кластера  
**Задача**: узнать список ваших привилегий в кластере

```shell script
kubectl config -h
cat ~/.kube/config
```

```shell script
kubectl config view
```

```shell script
kubectl config get-contexts
```

```shell script
kubectl config use-context \tab
kubectl auth can-i --list 
```
:eyes: [Подробнее про права и RBAC](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#role-binding-examples)

**Then** участники делятся возникшими и решенными проблемами и отвечают на вопросы
1. Что делать если команда не найдена?
1. Как я авторизовываюсь в кластере?
1. Кто может выдавать права доступа к кластера и в чём заключается "передача"?
1. Можно ли авторизоваться в kubernetes с помощью Ouath 2.0/OIDC т.е через "Соцсеточки"?
1. Как переключать кластеры без use-context?
1. Как избежать ошибок выполнения команд не на "тех" кластерах?
1. Как разделены ресурсы других участников во дном кластере?
1. Как выбрать свой namespace по умолчанию?
1. **Доп задание**\*: попробуйте добавить второй контекст с другим `namespace`
1. **Доп задание**\*: попробуйте использовать несколько конфигураций с помощью переменной окружения `KUBECONFIG`. Что будет с разными кластерами при выводе `kubectl config view`? [О KUBECONFIG](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/)

## K8S Concepts

1. Declarative vs Imperative
1. Control loop (Observe, Orient, Decide, Act) Jonh Boyd
1. Reconciliation
1. Real control loop examples by kubectl - Desired state vs Current stats (Observe, diff ,act Control model)
1. Kubernetes API-Server and OpenAPI

:shopping_cart: *Материалы*
1. [Настрокйка реквизитов docker-registry k8s](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/)
1. [K8S и Private Registry](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/)
1. [K8S LimitRanges](https://kubernetes.io/docs/concepts/policy/limit-range/)


### Hands-on practice quest #02: I have an application, I wish deploy it to production!
Знакомимся с базовыми возможностями kubectl - запускаем простейшую работу в кластере и ловим типичные проблемы

**Given** пары участников прошедших Docker тренинг  
**When** участники собирают приложение и деплоят в кластер
```shell script
kubectl create job test --image=busybox -- echo "Hello World"
```

**Задание**: Понять сработала ли наша задача
1. Почему не вывелись логи?
1. Почему у пода такое странное имя?

```shell script
kubectl describe pod test-<id>

kubectl create job test --image={{dockerRepository}}/{{sharedDockerImageName}} -- echo "Hello World" 

kubectl get pods
kubectl get jobs

kubectl logs jobs/test
kubectl delete job test
kubectl get pods
```

**Then**: участники делятся мыслями и отвечают на вопросы
1. в чём различие в семантике написания команд - `kubectl get job test` и `kubectl get jobs/test`? Попробуйте объяснить
1. что будет если команду вывода логов ввести так же разными способами (через \/ и через пробел)?
1. удаляется ли созданный pod после удаления job test?

**Задание**: запустить образ с curl, dig прочими инструментами для дебага

```shell script
# Попробуем запустить образ из репозиторя, требущего авторизацию
# INFO: Пригодится нам в будущем для исследовательских целей
kubectl run -it debug --image={{dockerRepository}}/{{privateDockerImageName}} -- /bin/sh
kubectl get events
kubectl create secret docker-registry regcred --docker-server=<your-registry-server> --docker-username=<your-name> --docker-password=<your-pword>
# <your-registry-server> - например https://{{dockerRepository}}
kubectl explain serviceaccount.imagePullSecrets
kubectl patch serviceaccount default -p '{"imagePullSecrets": [{"name": "regcred"}]}'

kubectl run -it debug --image={{dockerRepository}}/{{privateDockerImageName}} -- /bin/sh

kubectl get pods
```

**Then** участники делятся мыслями и соображениями
1. куда нужно запушить образ чтобы kubernetes кластер его успешно спулил?
1. какой правильный процесс деплоя образов?
1. чем отличается Job от Pods?
1. когда удаляется Pod созданный при создании Job?
1. кто ответственнен за это удаление?
1. **Доп задание**\*: Как упростить процесс создания `regcred` секрета если вы уже залогинены в docker registry через docker login?
1. **Доп задание**\*: Отредактируйте `serviceaccount` не через patch а через `kubectl edit`. Что будет если ошибиться в редактируемом манифесте?
1. **Доп задание**\*: Изменить дефолтный редактор для `kubectl edit`?
1. **Доп задание**\*: запустить под с лимитами по памяти в 16mb. [About K8S Limits](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)

## K8S Container isolation

1. Clusters and nodes
1. Clusters network isolation
1. Application in cluster resources
1. Cluster network availability
1. Docker run in Kubernetes and minimal configuration. Namespaces and pods fast introduction
1. Демо kubectl apply/get/describe и output моды

:shopping_cart: *Материалы*
1. [Подробно о ресурсах и CGroups](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/6/html-single/resource_management_guide/index)
1. [Про установки лимитов](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#requests-and-limits)

### Hands-on practice quest #03: Run apps in cluster
Познаём различные ограничения (технические и концептуальные) контейнерных технологий в связке с абстракциями K8S (Pod).
Делаем это на примере демо приложения "нож" и "масло"

**Given** пары участников имеют собранные образы   приложений  
**When** участники описывают поды с двумя сервисами и меняют состояние kubernetes


```shell script
cat handson/handson-03/apps-01.yml
kubectl apply -f handson/handson-03/apps-01.yml
```

**Then** участники делятся результатами и соображениями
1. Какой статус пода?
1. Найдите ошибку
1. Как посмотреть логи конкретного контейнера пода?

**Задание**: Исправьте ошибку пользуясь информацией `kubectl explain`

```shell script
# INFO: Не забываем что можно указать дефолтный контекст
kubectl config set-context --current --namespace=<>
kubectl explain pod.spec
kubectl edit butter-fabric
```

**Then**: участники делятся наблюдениями и разбираются что пошло не так
1. Какие возникли трудности при редактировании? Объясните почему так?
1. Как узнать что ещё можно узнать с помощью команды `kubectl explain`?

:eyes: Структура `kubectl explain` соответсвует манифеста ресурса K8S

**Задание**: передеплоить приложения отдельно

```shell script
kubectl delete -f handson/handson-03/apps-01.yml
kubectl apply -f handson/handson-03/apps-02.yml
kubectl explain pod.spec.containers.resources
# add limits 8Mi и cpu 200m
kubectl edit pod app-butter
vi handson/handson-03/apps-02.yml
kubectl apply -f handson/handson-03/apps-02.yml
kubectl get pods
```
:eyes: [Про установки лимитов](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#requests-and-limits)

**Then** приложение не запуcтилось
1. Найти информацию для извлечения признака проблемы
1. Найти оптимальное значение лимитов и исправить
1. Вывести все поды с ошибочным статусом в формате `name/image - status`. Смотри документацию jsonpath/go-template [kubectl jsonpath doc](https://kubernetes.io/docs/reference/kubectl/jsonpath/)
1. **Доп задание**\*: Задайте дефолтные квоты для приложений в вашем namespace


**Then** участники делятся результатами и соображениями
1. Как узнать что там с нашим приложением и результатами выполнения команды?
1. Если другой задеплоит под с таким же названием, он перезатрёт мой?
1. А в какой namespace приложение задеплоилось?
1. А на каком узле запустилось?
1. Как узнать какие проблемы у приложения при запуске?
1. Что значат ограничения по CPU 200mi ? Это сколько?
1. как понять какие ресурсы доступны для меня?
1. как понять какие ресурсы работают в рамках неймспейса??
1. как получить сырой вывод api?
1. получилось ли у вас отредактировать лимиты приложения? Какие были трудности?
1. **Доп задание**\*: Объясните как приложение понимает что ему нужно выключаться? С помощью каких команд можно узнать узнать кто быстрее выключается, `app-knife` или `app-butter`?

K8S Application networking
-------------------------------
1. Виды Service Discovery для приложений. Компромиссы каждого
1. Роутинг трафика в кластер и в кластере. Взаимодействие внешнего балансировщика, NSX-T и K8S
1. Доступность при деплое и политики обновления
1. K8S Services and namespaces
1. Демо kubectl exec curl с интерактивным watch для get pods/get svc -o wide

:shopping_cart: *Материалы*
1. [kubectl port-forward docs](https://kubernetes.io/docs/tasks/access-application-cluster/port-forward-access-application-cluster/)
1. [DNS Pod Service](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pods)
1. [Debugging DNS Resolution](https://kubernetes.io/docs/tasks/administer-cluster/dns-debugging-resolution/)
1. [man resolv.conf](https://man7.org/linux/man-pages/man5/resolv.conf.5.html)

Hands-on practice quest #04: Access to application via services
---------------------------------------------------------------
Получаем доступ к нашим приложениям, исследуем особенности сетевого взаимодействия.
Стараемся обращать внимание на жизненный цикл наших приложений

**Given** пары участников имеют задеплоенную версию   приложений  
**When** участники запускают команды и применяют новыю настройки  
**Задание**: Запустить cli-tools если отсутствует
> Для выполнения задания требуются приложения из [handson #03](#hands-on-practice-quest-03-run-apps-in-cluster)
```shell
# проверим что есть под debug, иначе запустим (см handson #02)
kubectl get pod debug 
# Откроем новую консоль
# Зайдём в контейнер и будем него будем производить дебаг наших приложений
kubectl exec -it debug -- /bin/bash
...
```

1. **Задание**: С помощью материалов ниже вычислите IP адресс и имя запущенного `Pod` и сделать запрос к сервису `app-knife`
   > Чтобы лучше понять - [Debugging DNS Resolution](https://kubernetes.io/docs/tasks/administer-cluster/dns-debugging-resolution/)
   > и [DNS Pod Service](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pods)
1. **Задание**: Допишете сервис для недостающего приложения и повторите запрос к app-knife. `curl app-knife-service:8080` должен заработать и выдать json ответ

```shell
cat handson/handson-04/services.yml
kubectl explain service.spec
kubectl expose --help
# применяем их
kubectl apply -f  handson/handson-04/services.yml
kubectl get services
kubectl get endpoints
```

**Задание**: Проверить работоспособность сервиса? ([О метаданных и labels](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#motivation))
1. Кто быстрей удаляется при `kubectl delete pod app-knife/app-butter`? Подумайте почему?
1. Работает ли `kubectl port-forward pod/app-knife 8080` если не задан `containerPort`?
1. На что влияет `containerPort` в pod.spec.containers.ports.containerPort?
1. Что будет если при работающей команде `kubectl port-forward pod/app-knife 8080` перезапустить pod app-knife?

**Задание**: Заставить сервис `app-butter-service` возвращать json ответ. (Совет: попробуйте разобраться, отвечая на ответы дальше по списку)
1. Объясните ответы от сервиса `app-knife` в случаях:
    1. не сервиса `app-butter-service`.
    1. есть сервис `app-butter-service` но нет labels у `app-butter`. (Воспользуйтесб debug подом и посмотрите что возвращает `app-butter-service`)
    1. есть и сервис и соответсвующий ему `labels.app`? (Попробуйте воспользоваться командой `kubectl edit pod app-butter` и добавить `metadata.labels.app=app-butter`
1. Можно ли включить интерактивный шел в запущенном контейнере?
1. Как выполнить команду в запущенном контейнере не заходя в него?

Попробуйте выполнить в debug контейнере следующие команды:
```shell
kubectl get pods
[debug] $ nslookup <pod-ip>
[debug] $ nslookup <pod-name>
[debug] $ nslookup <service-ip>
[debug] $ nslookup <service-name>
```

**Then** nslookup выдал обратные зоны по запрашиваемым IP
1. Кто ответственнен за это преобразование?
1. Как найти кто ответственен?
1. Можно ли его переконфигурировать?
1. **Задание**: Найти кто влияет на формат DNS имени

:eyes: [man resolv.conf](https://man7.org/linux/man-pages/man5/resolv.conf.5.html)

```shell script
[debug] $ cat /etc/resolv.conf
kubectl get services --all-namespaces | grep <nameserver-ip>
kubectl get pods --namespace=kube-system -l k8s-app=kube-dns
```


**Then** участники делятся результатами и соображениями отвечая на вопросы:
1. Как узнать что сервис настроен правильно и работает корректно?
1. Рестартовало ли приложение после повторного `kubectl apply -f pod.yml` и почему?
1. Что будет если изменить `metadata.labels.app`?
1. Что если остановить приложение и обратиться к сервису?
1. Кто настраивает `kube-dns`?
1. Как диагностировать `kube-dns`?
1. **Доп задание**\*: Как с помощью Service обращаться только к локальным endpoint'ам приложения?
1. **Доп задание**\*: Как настроить балансировку через DNS? Почему это не всегда приемлемо?
1. **Доп задание**\*: С помощью NetworkPolicies запретите доступ из `app-knife` к `app-butter`.

K8S Internal and External access to containers
----------------------------------------------
1. Containers Shell
1. K8S Ingress и его описание
1. kubectl exec

:shopping_cart: *Материалы*
1. [Подробнее об ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)

Hands-on practice quest #05: Redeploy application with ingress
--------------------------------------------------------------
Анонсируем доступ к нашему приложению из вне кластера. Подымаем вопросы доступности приложений и учимся искать проблему с помощью изученных ранее команд

**Given** пары участников имеют задеплоенную версию   приложений и сервисов  
**When** участники запускают команды и применяют новую настройки  
**Задание**: Настроить доступ из сети банка к приложений `app-knife` и `app-butter` следуя инструкциям

```shell script
# далее мы должны сделать так, чтобы тест заработал
watch -n0.1 curl -s -i http://app-knife-ingress{{ingressTemplate}}
# и тоже самое для app-butter
watch -n0.1 curl -s -i http://app-butter-ingress{{ingressTemplate}}
kubectl explain ingress.spec
# Завершите ingress конфигурацию (в шаблоне только для knife, app-butter нужно сделать самостоятельно)
vi handson/handson-05/ingress.yml
kubectl apply -f handson/handson-05/ingress.yml
```

**Then** `watch` вернул ответ app-knife сервиса. Участники делятся результатами и соображениями:
1. Как теперь достучаться до сервиса? Почему шаблон DNS именно такой?
1. Что будет если указать DNS имя не по шаблону? (my-awesome-domain.ru)
1. Что будет если убрать сервис?
1. Что будет если сервиса на который ссылаемся в ingress не будет?
1. Что случится если его добавить во время работы? Почему?
1. Как попробовать посмотреть что внутри ingress-controller?
1. Сколько инстансов каждого приложения?
1. Как ingress связан с ingress-controller?
1. Где находится ingress-controller?
1. Кто отвечает за "анонсирование" внутренних имён сервисов и имён для ingress?
1. **Доп задание**\*: Как посмотреть справку по конкретной версии API с помощью `kubectl explain ingress`?
1. **Доп задание**\*: Перепишите ingress с beta версии API на релизную - `networking.k8s.io/v1`
1. **Доп задание**\*: Можно ли отправить запрос на ingress, DNS которого не резолвится? Если да то как?

K8S Namespace, Pods, Containers again and Scaling
-------------------------------------------------
1. ReplicaSet
1. Deployment
1. TopologyKey

:shopping_cart: *Материалы*
1. [Подробнее об Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)

Hands-on practice quest #06: Redeploy application with replicas
---------------------------------------------------------------
Изучаем подробнее вопрос доступности приложений и маршрутизации трафика с учётом особенностей жизнненного цикла приложений

**Given** пары участников имеют задеплоенную версию приложений и сервисов и ingress  
**When** участники запускают команды и применяют новые настройки  
**Задание**: изменить запуск приложений в поде на запуск c помощью deployment (для app-butter и app-knife)

```shell
[tty0] $ watch -e -n0.1 curl --fail --show-error -s -i -v app-butter-ingress{{ingressTemplate}}
[tty1] kubectl explain deployment
# применяем деплоймент
## смотрим шаблон
[tty1] $ cat handson/handson-06/deployment.yml
## заполняем недостающую секцию
[tty1] $ vi handson/handson-06/deployment.yml
[tty1] $ kubectl apply -f handson/handson-06/deployment.yml
# после запуска снова запускаем команду для проверки
[tty0] $ watch -e -n0.1 curl --fail --show-error -s -i -v app-butter-ingress{{ingressTemplate}}
```

> Флаг `--fail` команды curl завершает команду с ошибочным статусом если был HTTP ответ не 200. В новых версиях curl можно использоваться флаг `--fail-with-body` и проигнорировать флаг `--show-error`

> Флаг `--show-error` показывает какая была ошибка в случае если вернулся не 200 статус. Это необходимо, т.к флаг `--fail` скрывает вывод в случае ошибки

> Флаги `-s` и `-v` команды curl носят информационный характер и делают более детальный вывод

> Флаг `-e` для команды watch прерывает повторы команды если команда завершилась ошибкой


**Задание**: Изменить количество реплик для deployment app-butter-deployment на 3 с помощью команды `kubectl scale` и исследовать надёжность нашего деплоймента

> Проверить работспособность можно командой `watch -e -n0.1 curl --fail --show-error -s -i -v app-butter-ingress.<namespace-name>.lb.<cluster-name>.k8s.raiffeisen.ru`

**Then** тест упал при увеличении количества реплик когда сервис вернул HTTP 500. Участники делятся результатами и соображениями
1. Почему упал тест? Разберитесь в источнике проблемы.
1. Как узнать в какое приложение попал запрос?
1. Как посмотреть логи сразу со всех инстансов приложения?
1. Как инстансы приложений распределены в кластере?
1. В какой момент приложение становится доступно для запроса curl?
1. Как вы думаете, какой вид балансировки используется при вызове `app-butter` из `app-knife`?
1. **Доп задание**\*: чтобы понять на каких узлах ваше приложение, выведите его в формате имя/узел.

K8S Application Probes and full deployments
-------------------------------------------
1. liveness and readiness probess
1. Application access model
1. LB probes and application availability for user corner cases
1. K8S Deployments

:shopping_cart: *Материалы*
1. [Kubernetes probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)

Hands-on practice quest #07: Redeploy application with probes
-------------------------------------------------------------
Пытаемся митигировать недоступность нашего приложения средствами K8S

**Given** пары участников имеют задеплоенную версию   приложений и сервисов и ingress  
**When** участники запускают команды и применяют новую настройки  
**Задание** добиться стабильной работы приложения с помощью добавления проб

Конфигурируем для одного приложение rediness/liveness для другого нет
```shell
[tty0] $ watch -e -n0.1 curl --fail --show-error -s -i app-butter-ingress{{ingressTemplate}}

[tty1] $ kubectl edit deployment app-butter-deployment
[tty1] $ kubectl apply -f deployment.yml
```

**Then** участники делятся результатами и соображениями
1. Будут ли доходить запросы до приложения если livenessProbe отрицательна а readinessProbe положительна?
1. Достаточно ли только readiness для надёжной работы app-butter?
1. В каком случае нельзя без `startupProbe`?
1. Как связаны `startupProbe` и `livenessProbe`, `readinessProbe`?
1. Можно ли поймать такой же эффект как 500 ошибка при старте, но при остановке приложения?
1. Доходят ли запросы через Service если Pod в статусе Terminating?

Hands-on practice quest #7.1: Edit deployment
---------------------------------------------
Разбираемся с особенностями работы Pod созданных через Deployment\*

**Given** пары участников имеют задеплоенную версию приложений и сервисов и ingress  
**When** участники запускают команды и применяют новую настройки  
**Задание** поэкспериментировать с `ReplicaSet`

Изменим `metadata.labels.app` на `app-butter-edited`
```shell
[tty0] $ kubectl get replicasets -w
[tty1] $ kubectl edit pod app-butter-<custom-id-autocomplete-it>
[tty1] $ kubectl get pods
```

Вернём обратно metadata.labels.app
```shell
kubectl edit pod app-butter-<>
kubectl get pods
```

**Then** участники делятся результатами и соображениями
1. Что случилось со старым приложением при изменении labels?
1. Объясните поведение
1. Как посмотреть текущие ReplicaSet?
1. Как понять привязан ли он к Deployment?
1. Зачем остаются старые ReplicaSet?
1. Как удалить все изменённые поды?
1. **Доп задание**\*: В каких ситуациях может измениться `CURRENT` значение в списке `kubectl get rs`, назовите хотя бы две и поясните какие из них наиболее реальны в ваших условиях

K8S Deployment rollout
----------------------
1. Отличия Deployment от ReplicaSet и рекомендации
1. kubectl rollout undo demo

Hands-on practice quest #07.2: deployment rollout
-------------------------------------------------
Исследуем механизмы встроенного версионирования и отката ревизий в K8S

**Given** пары участников имеют задеплоенную версию   приложений и сервисов и ingress  
**When** участники запускают команды и применяют новую настройки  
**Задание** понять как работают механизмы отката `Deployment`

Изменим metadata.labels.app
```shell
[tty0] $ kubectl get rs -w # rs = replicaset
[tty1] $ kubectl rollout history deployment app-butter-deployment
[tty1] $ kubectl rollout undo deployment app-butter-deployment --to-revision=<revision-number>
[tty1] $ kubectl get deployment app-butter-deployment -o yaml
[tty1] $ kubectl get rs
```

**Then** участники делятся результатами и соображениями
1. Можно ли откатиться на уже откаченную версию (последнюю)?
1. Как посмотреть все deployments на кластере?
1. Изменится ли версия deployment если изменить связанный с ним `ReplicaSet`? А если Pod?
1. Почему в списке `ReplicaSet` есть какие то пустые? Объясните зачем они

K8S Multi path applications
---------------------------
1. Basic Reverse proxy concepts
1. Ingress rules - rewrite, split locations, certs

:shopping_cart: *Материалы*
1. [Nginx ingress docs](https://kubernetes.io/docs/concepts/services-networking/ingress/)
1. [Nginx ingress path mapping](https://kubernetes.github.io/ingress-nginx/user-guide/ingress-path-matching/)
1. [Reverse proxy - HowTo](https://kinsta.com/blog/reverse-proxy/)

Hands-on practice quest #08: Two apps in one domain
---------------------------------------------------
Изучаем особенности маршрутизации трафика в кластер и настраиваем более сложную схему.
Подымаем вопросы совместимости и Reverse Proxy компромиссы

**Given** пары участников имеют задеплоенную версию   приложений и сервисов и ingress  
**When** участники запускают команды и применяют новую настройки  
**Задание**: сделать новый ingress, чтобы приложения работали на одном хосте

:eyes: [Nginx ingress docs](https://kubernetes.io/docs/concepts/services-networking/ingress/)  
:eyes: [Nginx ingress path mapping](https://kubernetes.github.io/ingress-nginx/user-guide/ingress-path-matching/)  
:eyes: [Nginx ingress rewrite](https://kubernetes.github.io/ingress-nginx/examples/rewrite/)  
:eyes: [Nginx ingress forwarded prefix header](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#x-forwarded-prefix-header)  
:eyes: [Про Reverse Proxy с X-Forwarder-* на примере Spring](https://tomgregory.com/spring-boot-behind-load-balancer-using-x-forwarded-headers/)


```shell
# Тест должен заработать
[tty0] $ watch -n0.5 curl -s -i training-app{{ingressTemplate}}/app-butter
# or
[tty0] $ watch -n0.5 curl -s -i training-app{{ingressTemplate}}/app-knife

[tty1] $ kubectl explain ingress.spec.rules.http.paths
# Выносим приложения на разные пути одного домена
[tty1] $ vi ingress.yml
[tty1] $ kubectl apply -f ingress.yml
```

**Задание**: просмотрите логи всех приложений `app-butter`
1. Какие заголовки приходят в приложение?
1. Как посмотреть логи всех подов деплоймента?
1. Как ещё можно отфильтровать приложения чтобы выводить логи группы подов?

**Then** участники делятся результатами и соображениями
1. Пробовали открыть UI? Всё работает как нужно?
1. Как можно исправить проблему с путями? (3 варианта)
1. Достаточно ли заголовков которые приходят для восстановления контекста запроса?
1. Как посмотреть логи всех инстансов(подов) приложения?
1. как посмотреть какие сейчас есть "балансировщики" в кластере?
1. По какому пути (HTTP PATH) запросы приходят в приложение из нового ingress?
1. Что будет, если приложение будет обрабатывать каждый путь отдельно а не все одинаково? (например `/api/butter` и `/api/knife` соответственно). Что нужно сделать чтобы в такой ситуации работали оба ingress правила?
1. **Доп задание**\*: HAL API: как быть с обратными ссылками? Как узнать с какого адреса пришёл запрос?
1. **Доп задание**\*: Сделайте так, чтобы в приложение приходил url без `/app-knife/info` и `/app-butter/info` - т.е чтобы `/info` внутри приложения заработал при обращении через `training-app` ingress
1. **Доп задание**\*: Добавьте `x-forwarder-prefix` заголовок для ingress `training-app`
1. **Доп задание**\*\*: Можно ли настроить TLS для нашего сервиса на ingress? Попробуйте сделать

K8S ConfigMaps
----------------
1. DNS TTL и как это влияет на maintenance приложений
1. Локальность данных при использовании DNS Discovery
1. K8S Config maps - Что это и где стоит использовать а где нет
1. \* Подробно Forwarded RFC + расширения

:shopping_cart: *Материалы*
1. [Подробнее о ConfigMap](https://kubernetes.io/docs/concepts/configuration/configmap/)
1. [Про Shell ENV Variables](https://en.wikipedia.org/wiki/Environment_variable)
1. [Exposing information to pod](https://kubernetes.io/docs/tasks/inject-data-application/environment-variable-expose-pod-information/)

Hands-on practice quest #09: Redeploy application with custom configuration
---------------------------------------------------------------------------
Знакомимся с механизмами внешних конфигураций подробно и пытаемся сконфигурировать наши приложения
Подымаем вопросы конфигурации "коробочных" приложений

**Given** пары участников имеют   app-knife-deployment и app-butter-deployment в своём namespace  
**When** участники запускают команды и применяют новую настройки  
**Задание**: Вынести настройку имени сервиса (`CALL_HOST`) и таймаута app-butter (`CALL_TIMEOUT`) в конфигурацию для возможной смены

:eyes: [Подробнее о ConfigMap](https://kubernetes.io/docs/concepts/configuration/configmap/)

```shell
kubectl explain pod.spec.containers.env 
kubectl explain configmap 
vi configmap.yml
vi deployment.yml
kubectl apply -f configmap.yml
kubectl create configmap -h 
```
**Then** ConfigMap успешно создался и вы убедились что он создан  
**Задание**: Попробуйте вывести ключи сохраннёные внутри ConfigMap
1. В каком формате хранятся данные внутри ConfigMap?
1. Что будет если добавить одинаковые ключи в секцию `.data` и `.binaryData` ?
1. Как посмотреть что было сохранено и почему так сложно? Поясните

:eyes: [Про Shell ENV Variables](https://en.wikipedia.org/wiki/Environment_variable)

**Then** Настройки подтянулись в app-knife  
**Задание**: измените конфигурацию - сменить таймаут. После проверьте значение
1. Когда меняется значение?
1. Попробуйте объяснить почему так

**Then** Настройки подтянулись в app-knife  
**Задание**: добавьте в configmap.yml не просто key-value настройку, а полноценный многострочный `nginx.conf` "файл" (контент ниже). Смонтируйте его содержимое контейнер в папку `/usr/src/app`

```plain
user       www www;
error_log  logs/error.log;

http {
  include    conf/mime.types;
  index    index.html index.htm index.php;

  server { # php/fastcgi
    listen       80;
    server_name  example.com www.example.com;
    
    location ~ \.php$ {
      fastcgi_pass   127.0.0.1:1025;
    }
  }
}
```

```shell
kubectl explain pod.spec.volumes
kubectl explain pod.spec.containers.volumeMounts

vi configmap.yml
vi deployment.yml

kubectl apply -f configmap.yml
kubectl apply -f deployment.yml
```

**Then** участники делятся результатами и соображениями
1. Когда меняется значение в файле?
1. Всегда ли будет работать обновления файла?
1. Как узнать понять, будут ли файла обновляться из контейнера?
1. Как проверить что изменения подтянулись?
1. нужен ли рестарт приложения после применения configmap? Обоснуйте так лучше?
1. Можно ли добавить информацию с манифеста приложения в env?
1. **Доп задание**\*: Добавьте имя машины (`nodeName`) на которой запустился под в переменную окружения `POD_NODE_NAME`

:eyes: [Exposing information to pod](https://kubernetes.io/docs/tasks/inject-data-application/environment-variable-expose-pod-information/)

K8S Secrets
----------------
1. K8S Secrets object. Secret types and security considerations
1. Secrets best practice for Cloud Native apps
1. Required support for security from infrastructure side and app side

:shopping_cart: *Материалы*
1. [About Secret Encryption](https://kubernetes.io/docs/tasks/administer-cluster/kms-provider/)

Hands-on practice quest #10: K8S Secrets simple practice
--------------------------------------------------------
Знакомимся с секретами K8S, обсуждаем их компромисы и варианты использования
Пробуем сконфигурировать наше приложение с помощью секретов

**Given** пары участников имеют `app-knife-deployment`   и `app-butter-deployment` в своём namespace  
**When** участники запускают команды и применяют новую настройки  
**Задание**: создать секрет и добавить его в приложения используя секции `data` и `stringData`. Проверить его наличие и формат

```shell
kubectl explain secrets
kubectl explain secrets.data
kubectl explain secrets.stringData
vi handson-10/secret.yml
kubectl apply -f handson-10/secret.yml
```

**Then** участники деляться результатами и соображения, отвечая на вопросы:
1. В каком формате находятся данные в секции `data`?
1. Можно ли записать "неправильные" данные в `data` и что будет при попытке их прочитать?
1. Что будет если ключи в `data` и `stringData` пересекутся?
1. Можно ли обратиться к stringData после применения ресурса (`kubectl apply -f ...`)

**Задание**: смонтировать секреты `username` и `password` в папку `/usr/src/app` вместе с конфигом `nginx.conf` из предыдущего задания

```shell
# изучим возможности
kubectl explain pod.spec.volumes
kubectl explain pod.spec.containers.volumeMounts
kubectl explain pod.spec.containers.env 
kubectl explain pod.spec.containers.env.valueFrom.secretKeyRef

# Добавляем секреты в наши поды 
vi handson-10/deployment.yml
kubectl apply -f handson-10/deployment.yml
```

**Then** участники делятся результатами и соображениями
1. как вывести текущее значение `username` и `password` секрета `the-secret-of-tasty-sandwich`? Какое оно и почему?
1. можно ли зашифровать секрет?
1. чем секрет отличается от ConfigMap
1. безопасен ли такой секрет?
1. чем отличаются секции data и stringData?
1. что нужно сделать чтобы безопасно получать секрет в приложении?
1. помните где мы уже сталкивались с секретами?
1. что будет если смонтировать `secrets` и `configmaps` во одну директорию?

**Задание**: смонтируйте секрет `nginx.conf` и любое из значений в `ConfigMap` из предыдущей практики в директорию к приложению - `/usr/src/app`s

```shell
# изучим возможности
kubectl explain pod.spec.containers.volumeMounts.subPath
kubectl explain pod.spec.volumes.secret.items
kubectl explain pod.spec.volumes.configMap.items

vi handson-10/deployment.yml
```

**Then** участники делятся результатами и соображениями
1. Какие возникли сложности при монтировании?
1. Попробуйте объяснить почему так сложно?
1. Как бы сделали вы?
1. **Доп задание**\*: Попробуйте создать секрет другими способами

```shell
kubectl create secret generic secret_name \

# Далее четыре варианта создания секрета из файла
1. --from-file=secret.txt \ 
2. --from-file=key=secret.txt \ 
3. --from-literal=key=value
4. --from-env-file=.env
```

**Then** участники делятся результатами и соображениями по дополнительному заданию
1. В чём отличие типа у regcred от обычного секрета? Как закодирован ваш пароль?
1. **Доп задание**\*: Когда такой способ может быть удобен?
1. **Доп задание**\*: Попробуйте найти свой пароль из секрета regcred ( создавался в [задании 02](#hands-on-practice-quest-02-i-have-an-application-i-wish-deploy-it-to-production) )

K8S Apps Distribution
---------------------
1. Manage application topology
1. Taints and Tolerations
1. Topology keys
1. Disruption Budget
1. Node maintenance

:shopping_cart: *Материалы*
1. [Подробнее о практиках и ограничениях масштабирования](https://kubernetes.io/docs/setup/best-practices/cluster-large/)
1. [Подробнее про Affinity и способы распределения Pod](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/)

Hands-on practice quest #11: Reconfigure apps distribution
----------------------------------------------------------
Знакомимся с техниками управления распределением Pod по Node в кластере K8S. Перераспределяем поды наших приложений по заданным правилам

**Given** пары участников имеют `app-knife-deployment`   и `app-butter-deployment` в своём namespace  
**When** участники запускают команды и применяют новую настройки  
**Задание**: Увеличить количество реплик и запустить поды только в двух зонах кластерах. :eyes: _Увеличьте количество реплик до 10, чтобы было более наглядно_

> проверьте наличие объекта limitranges (создавался в задание #03). :eyes: [Подробнее о практиках и ограничениях масштабирования](https://kubernetes.io/docs/setup/best-practices/cluster-large/)
> Если их нет, то отредактируйте файл `handson/handson-03/default-limits.yml` для установки лимитов в 20Mi.
> После чего примените его если нет с помощью команды:
`kubectl apply -f handson/handson-03/default-limits.yml`.
> :warning: Это мера предосторожности, чтобы не скушать слишком много ресурсов при увеличении количества реплик


```shell
kubectl edit deployment app-knife-deployment
```

**Then** участники делятся результатами и соображениями
1. Всё ли хорошо с приложениями?
1. Как вывести доступные зоны?
1. Как посмотреть последние свалившиеся приложения?
1. Как вывести все ноды на которых запущено приложение `app-knife`?
1. Как задать не только дефолтные лимиты на поды, но и общий лимит на весь наш неймспейс?
1. Как посмотреть загрузку кластера?

**Задание**: запустить поды на всех узлах кроме одного. __nodeAffinity практика__

**Then** участники делятся результатами и соображениями
1. Подумайте, насколько это жизненный сценарий? На что это похоже из ваших приложений?
1. Какую роль играет `topologyKey` для `requiredDuringSchedulingIgnoredDuringExecution`?
1. Можно ли сделать так, чтобы app-knife деплоились только на узлы на которых нет app-butter?
1. Для чего используется anti affinity правила?
> [Подробнее про Affinity и способы распределения Pod](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/)

**Задание**: запустить поды так, чтобы на каждой ноде оказалось по одному `app-knife` и `app-butter`.  __podAffinity/podAntiAffinity практика__  
**Then** участники делятся результатами и соображениями
1. Какие ещё могут быть сценарии распределения приложений?
1. Откуда берутся лейблы вида - `kubernetes.io/hostname`? Они стандартные?
1. Как бы вы называли свои лейблы в компании? Поясните почему
1. Как посмотреть загрузку конкретного узла?

**Доп задание**\*: Как вывести все зоны на которых запущены приложения `app-knife`?

```shell
kubectl edit deployment app-knife-deployment
```

**Доп задание**\*: Изучите объект `ResourceQuotas` и добавьте его. Как проверить его работоспособность?  
**Доп задание**\*\*: Изучите объект `PodDisruptionBudget` и добавьте его. Как проверить его работоспособность?

```shell
kubectl explain resourcequota
vi handson/handson-12/resourcequota.yml
#...
```

K8S Jobs Management and workload distribution
---------------------------------------------
1. Jobs Scheduling и специфичные виды запуска
1. DaemonSets, CronJobs
1. High Level альтернативы. Argo workflow etc.
1. Демо запуск нагрузки на наше приложение через jobs

Hands-on practice quest #12: Practice with DaemonSet and CronJob
----------------------------------------------------------------
Знакомимся с новыми абстракциями K8S для запуска новых видов работ

**Given** пары участников имеют задеплоенную версию   приложений и сервисов и ingress и завершили задания  
**When** участники запускают команды и применяют новую настройки  
**Задание**: переделайте app-knife `deployment` в `daemonset`. Возьмите за основу ту версию которые сейчас задеплоена

:eyes: Это задание выполняется полностью самостоятельно. Без стартового материала

```shell
kubectl explain daemonset
vi handson/handson-12/deployment.yml
```

**Then** участники делятся результатами и соображениями
1. Может ли daemonSet `selector.matchLabels` переиспользовать наши старые поды из deployment?
1. Как вы думаете, для чего так сделано?
1. Что имеет смысл запускать с помощью daemonset ?

1. Задание: запустите cronjob которые каждые 5 минут проверяет на работоспособность доступность нашего приложения и печатает результат в консоль

:eyes: Это задание выполняется полностью самостоятельно. Без стартового материала

```shell
kubectl explain cronjob
vi handson/handson-12/deployment.yml
```  

**Then** участники делятся результатами и соображениями
1. как что-то сделать при завершение Job ?
1. что будет если предыдущие Job ещё не выполнился, при этом пришло время запускать следующий по расписанию? Как этим управлять?
1. если запускать задание каждые 5 секунд то через 24часа у меня будет больше 17_000 завершённых Job? Как вы думаете, это нормально?
1. может ли CronJob запустить много Job одновременно? (`kubectl explain cronjob.spec.startingDeadlineSeconds`)
1. а если что-то пошло не так?

:eyes: [Про ограничения и неоднозначные моменты CronJob](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/#cron-job-limitations)

K8S Base Homework
-----------------

**Задание**: С помощью полученных ранее знаний разберитесь с NetworkPolicies самостоятельно  
**Задание**: найдите существующие NetworkPolicies или попробуйте создать новые в вашем неймспейсе. Проинтерпретируйте их настройки:
- что там за ip?
- что там за ip?
- что это за подсети?
- что разрешается?
- что запрещается?

**Задание**: запретить доступ для приложения *app-knife* к приложению *app-butter*
- С помощью чего блокируется сетевое взаимодействие?
- Гарантируется ли что во всех случаях запросы от *app-knife* к *app-butter* будут заблокированы?



