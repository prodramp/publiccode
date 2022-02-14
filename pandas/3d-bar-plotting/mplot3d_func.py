import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import pandas as pd
import numpy as np

def generate_3d_plot(dataFrame, col1, col2, col3, heading, color):
    sub_df = dataFrame[[col1,col2, col3]].dropna()
    sub_df[col1] = sub_df[col1].map(lambda x: 5*(x//5))
    sub_df[col2] = sub_df[col2].map(lambda x: 10*(x//10))

    dictionnaire = sub_df.groupby([col2, col1])[col3].count().to_dict()

    def get_count(i, j, dictionnaire):
        if (i,j) in list(dictionnaire.keys()):
            # (i,j) is a key
            return dictionnaire[(i,j)]
        else:
            return 0

    from mpl_toolkits.mplot3d import Axes3D

    # setup the figure and axes
    fig = plt.figure(figsize=(20, 20))

    ax = fig.add_subplot(111, projection='3d')
    _x = np.array([i[0] for i in list(dictionnaire.keys())])
    _y = np.array([i[1] for i in list(dictionnaire.keys())])

    np.random.shuffle(_x)
    np.random.shuffle(_y)

    _x = _x[:40]
    _y = _y[:40]

    _xx, _yy = np.meshgrid(_x, _y)
    x, y = _xx.ravel(), _yy.ravel()

    top = np.array([get_count(i, j, dictionnaire) for i, j in zip(x, y)])
    bottom = np.zeros_like(top)
    width = 3
    depth = 1 # 1..5 wider 3D vars
    
    ax.bar3d(x, y, bottom, width, depth, top, alpha=0.3, color=color)

    ax.set_title('3D Plot ' + heading + ' = f(' + col2 + ', ' +  col1 +' )')
    ax.set_xlabel(col2)
    ax.set_ylabel(col1)
    ax.set_zlabel(col3)
    
    #     ax.view_init(0, 0)
    # ax.view_init(azim=0, elev=90) # View from the Top

    
    plt.show()

