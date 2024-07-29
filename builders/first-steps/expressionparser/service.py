import rpyc
import os
from datetime import datetime
import torchvision
from torch import tensor

class MyService(rpyc.Service):
    def on_connect(self, conn):
        # code that runs when a connection is created
        # (to init the service, if needed)
        print('hi')

    def on_disconnect(self, conn):
        # code that runs after the connection has already closed
        # (to finalize the service, if needed)
        pass

    def exposed_parse(self, expression):
        return expression + "zz"



if __name__ == "__main__":
    from rpyc.utils.server import ThreadedServer
    t = ThreadedServer(MyService, port=18861)
    print("Starting dispatches server.")
    t.start()
