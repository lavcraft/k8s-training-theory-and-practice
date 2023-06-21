---
name: K8S - Stateful Apps
order: 20
---

K8S Statefull Apps
==================
4 часа

Введение
--------------

- [ ] PV and PVC
- [ ] Static vs Dynamic Provisioning
- [ ] StatefulSet

Hands-on practice quest #00: working with pvc and statefulset
-------------------------------------------------------------
Пробуем воспользоваться "файловыми" ресурсами кластера для постоянного хранения данных в наших подах

**Given** сформированы пары участников  
**When** участники используют команды и проанализируют их вывод и поведение  
**Задание** познакомиться со `PersistentVolumeClaim` и `StorageClass`

```shell script
kubectl explain pvc
kubectl get storageclasses

cat >sandwich-ingridients.yml <<EOF
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: sandwich-ingridients
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 20Mi
EOF
```

`kubectl apply -f sandwich-ingridients.yml`

**Then**: ресурс успешно создан
1. Как проверить в каком статусе сейчас наш `PersistentVolumeClaim`?
1. Доступен ли созданный `PersistentVolumeClaim` во всём кластере или только в нашем неймспейсе? Почему?


**Задание**: монтируйте директорию в какой либо `Pod` или `Job`. Запишите данные и попробуйте его пересоздать

> Примеры `Pod` или `Job` вы можете
> 1. взять из предыдущих заданий (например handson-03)
> 2. написать сами
> 3. получить с помощью команду `kubectl create/run` и переиспользовать манифест в дальнейшем

```shell
kubectl explain pod.spec.volumes.persistentVolumeClaim
kubectl explain pod.spec.containers.volumeMounts

vi sandwich-ingridients.yml
kubectl apply -f sandwich-ingridients.yml
kubectl exec -it <mypod> -- sh
echo "tasty potatos" > <mountdir>/potato

kubectl delete pod <mypod>
kubectl apply -f sandwich-ingridients.yml

# если вы сделали pod - добавляем второй под с тем же PVC
vi sandwich-ingridients.yml 
kubectl apply -f sandwich-ingridients.yml
```

**Then** участники делятся возникшими и решенными проблемами и отвечают на вопросы
1. На каком узле запустился под после пересоздания пода?
1. Можно ли перенести под на другую ноду?
1. Можно ли запустить ещё один под с этим pvc? Попробуйте
1. Удаляется ли PVC после удаления Pod?
1. Можно ли удалить PVC до удаления Pod?

Hands-on practice quest #01: Statefull apps scaling
---------------------------------------------------
Переходим от одиночного инстанса к полноценным отказоустойчивым приложениям с состояниями.
Проводим аналогии с знаниями полученными в первой части тренинга

:shopping_cart: *Материалы*
1. [Creating a StatefulSet](https://kubernetes.io/docs/tutorials/stateful-application/basic-stateful-set/#creating-a-statefulset)

**Задание**: создайте `statefulset` и попробуйте получить доступ к его разным элементам

```shell
kubectl explain statefulset.spec

# переделываем своё приложение на StatefulSet для запуска в режиме нескольких инстансов
vi sandwich-ingridients.yml
kubectl apply -f sandwich-ingridients.yml
kubectl get pods
kubectl get pvc
kubectl exec -it debug -- sh
[debug]$ nslookup <pod-static-name>.<stateful-service-name>
```

**Задание**:
1. зайдите в контейнер и запишите данные.
1. Удалите контейнер и наблюдайте за состоянием statefulset.
1. Проверьте что стало с данными
1. Перезапустите/отмасштабируйте `statefulset`

Подведите итоги:
**Then** участники делятся возникшими и решенными проблемами и отвечают на вопросы
- Как возникли сложности?
- Для чего нужен `serviceName` в `StatefulSet`?
- Может ли у пода из `StatefulSet` меняться IP?
- Для чего стоит использовать Service с `clusterIP: None`?
- Когда удаляются PVC?
- Когда стоит использовать статический PV?
- В каком порядке запускаются поды в `StatefulSet`?