---
title: RPC
date: 2019-2-13
categories: Distributed
tags:
- RPC
- GO
- 微服务
- 分布式
- 所有文章
---

## GO使用jsonRPC
### 一个服务
```go
type DemoService struct {}

type Args struct {
    A,B int
}

func (DemoService)Div(args Args,result *float64) error {
    if args.B==0{
        return errors.New("divide by 0")
    }
    *result=float64(args.A)/float64(args.B)
    return nil
}

```

```shell
[root@iZuf6720onwdpnl2xfy65lZ ~]# telnet localhost 1234
Trying 127.0.0.1...
Connected to localhost.
Escape character is '^]'.
{"method":"DemoService.Div","params":[{"A":3,"B":4}],"id":1}
{"id":1,"result":0.75,"error":null}
```

```shell
[root@iZuf6720onwdpnl2xfy65lZ go]# docker run -p 1234:1234 -v $PWD/go:/usr/go -it golang
root@a55a89d65b42:/go# ls
bin  src
root@a55a89d65b42:/go# cd /usr/go
root@a55a89d65b42:/usr/go# ls
jrpc
root@a55a89d65b42:/usr/go# cd jrpc
root@a55a89d65b42:/usr/go/jrpc# ls
rpc.go	server
root@a55a89d65b42:/usr/go/jrpc# cd server/
root@a55a89d65b42:/usr/go/jrpc/server# ls
server.go
root@a55a89d65b42:/usr/go/jrpc/server# go build server.go
root@a55a89d65b42:/usr/go/jrpc/server# go run server
package server: cannot find package "server" in any of:
	/usr/local/go/src/server (from $GOROOT)
	/go/src/server (from $GOPATH)
root@a55a89d65b42:/usr/go/jrpc/server# go run server.go
```
<Valine></Valine>
