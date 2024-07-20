FROM node:slim
USER root

RUN mkdir -p /home/node/.cache/yarn /home/node/app && \
    chown -R node:node /home/node/.cache /home/node/app && \
    chmod -R u+rwx /home/node/.cache /home/node/app

USER node
RUN yarn config set cache-folder /home/node/.cache/yarn
WORKDIR /home/node/app
