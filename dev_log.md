# 1.canvas install error
canvas@2.8.0 install: `node-pre-gyp install --fallback-to-build`

问题:
node-pre-gyp WARN Using request for node-pre-gyp https download
从github下载c++的编译包太慢
解决：
npm install canvas --canvas_binary_host_mirror=https://npm.taobao.org/mirrors/node-canvas-prebuilt/
or:
npm install  canvas@2.8.0 --ignore-scripts
只要是：npm ERR! Failed at the XXX@X.X.X install script 这种错误
都可以：npm install XXX@X.X.X --ignore-scripts进行更改

# 2.
