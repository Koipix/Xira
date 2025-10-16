# Portable Executable Malware Classifier Model (PEMCM)

This simple project was made with the purpose for our college project requirements, tailored to identify unsuspecting exectuable files through classification.
Trained with [KNN](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm) supervised learning as our main requirement for this project. 

This might sound a bit of a stretch for KNN but surprisingly it works well during our testing!

PS. This README is incomplete and still in progress (sleeeepy) :3

## Installation
### Clone the project
```
git clone https://github.com/Koipix/Xira.git
cd Xira
```
### Create a python [virtual environment](https://docs.python.org/3/tutorial/venv.html) and activate (Optional)
```
python -m venv sklearn-env
sklearn-env\Scripts\activate
```
### Install the libraries within virtual environment or globally
```
pip install -U scikit-learn pandas lief uvicon
```
I'll setup up the requirements file for this later

### Go to into ```xira-react``` and install npm packages
```
cd xira-react
npm i
```
### Run the project
```
npm run dev
```

### File Path Convention
The function will dynamically look for the dataset at `$HOME/ember_dataset/train_features.1.jsonl` so be sure to transfer the specific file required at your home directory as followed.

This will eliminate the need to change the file path everytime when the project is pulled from a different device thus improving efficiency and saving you a good time.

## Credits
[EMBER](https://github.com/elastic/ember) for the abundant dataset for classfying malware and made this project possible.

[LIEF](https://lief.re/) used to extract the features from PE files included in the EMBER dataset.
