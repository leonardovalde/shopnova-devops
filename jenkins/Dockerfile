FROM jenkins/jenkins:lts-jdk21

USER root
# Docker CLI (+ buildx) para construir imágenes usando el Docker del host
COPY --from=docker:cli /usr/local/bin/docker /usr/local/bin/docker
COPY --from=docker:cli /usr/local/libexec/docker/cli-plugins /usr/local/libexec/docker/cli-plugins

USER jenkins
RUN jenkins-plugin-cli --plugins \
    git github workflow-aggregator docker-workflow credentials-binding pipeline-stage-view