---js
{
name: 'K8S - Core',
binaryRepository: { value: 'binary.mycompany.com', description: 'Your company private binary repository address' },
}
---

# Some requirements for workstation

## Install software and tools

Install required and optional software. Optional for more comfortable work

### Hands-On Requirements #00: prepare workspace

1. Install terminal or ssh client.
    1. osx `brew install iterm`
    1. windows `choco install cmder`
    1. linux just work
1. Generate ssh keys - `ssh-keygen`
1. Pass https://vim-adventures.com/ (for free)

### Hands-On Requirements #01: prepare to work


1. For RHEL7 `sudo yum install helm jq git docker kubectl`
1. WARNING: temporary solution for install kubectl in RHEL8
    1. open https://{{binaryRepository}} and login
    1. Search `kubectl` and copy `url to file`
    1. Click setup me and configure artifactory repository (unlock config with credentials by your password). Follow instructions
    3. install `sudo yum install kubectl`
1. For RHEL8 `sudo yum install helm jq git podman podman-docker`

**Sudo**
> Используется для получения прав root

**Wget**
> Для загрузки файлов по сети. man wget для подробной информации

**Jq**
> для форматирование и поска по JSON ответам API K8S

**Podman**
> замена docker для Rhel 8

**Git**
> для того чтобы получить материалы тренинга


