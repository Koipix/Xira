import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, mean_absolute_error, r2_score, confusion_matrix, ConfusionMatrixDisplay
import matplotlib.pyplot as plt
import re

#extracts password input
def extract_features(password: str):
    length = len(password)
    num_upper = len(re.findall(r"[A-Z]", password))
    num_lower = len(re.findall(r"[a-z]", password))
    num_digits = len(re.findall(r"\d", password))
    num_symbols = len(re.findall(r"[^a-zA-Z0-9]", password))  # everything else

    return [length, num_upper, num_lower, num_digits, num_symbols]


# Example usage

data = pd.read_csv("data.csv", usecols = [0,1], names = ["pass", "str"]);

valid_strengths = ["0", "1", "2"];
data = data[data["str"].isin(valid_strengths)];

X = [];
y = data['str'].iloc[:100000].values;

pw_list = data["pass"].iloc[:100000];

# print(data.isna().sum());

for pw in pw_list:
    X.append(extract_features(pw));    


#train test split
print("splitting...")
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.5, random_state = 42)
print("splitting complete")

##Finding the best k
# k_values = range(5, 50, 5)
# cv_scores = []

# print("calculating best k...")
# for k in k_values:
#     print("k: ", k)
#     knn = KNeighborsClassifier(n_neighbors = k, algorithm = 'kd_tree')
#     scores = cross_val_score(knn, X_train, y_train, cv = 3, scoring = 'accuracy', n_jobs = -1)
#     cv_scores.append(scores.mean())
#     print("   accuracy: ", scores.mean())
#
# best_k = k_values[cv_scores.index(max(cv_scores))]
# print("Best k: ", best_k, "\nAccuracy: ", max(cv_scores))

##Training using KNN
print("training...")
knn = KNeighborsClassifier(n_neighbors = 25)
knn.fit(X_train, y_train)
print("training completed\n")




#------------------------------------------------------------------------------------------
#prediction
y_pred = knn.predict(X_test)

cm = confusion_matrix(y_test, y_pred)
disp = ConfusionMatrixDisplay(confusion_matrix=cm,
                              display_labels=["weak", "medium", "strong"])
disp.plot(cmap=plt.cm.Blues)
plt.show()

input = input("enter password: ")
predict = knn.predict([extract_features(input)])
print(predict)


















