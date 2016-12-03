import {Injectable} from '@angular/core';

import {Environment} from '../../components/environment';

@Injectable()
export class FileProvider {
    environment: Environment;

    private _reader: FileReader;
    private _file: File;
    private _payload: String = null;
    private _loading: Boolean = false;

    public maxFileSize: Number = Environment.get('fileProvider').maxFileSize; // should be in bytes
    public allowedFileTypes: Array<String> = Environment.get('fileProvider').allowedFileTypes; // should be ['png', 'jpg'] <= from 'images/png', 'images/jpg': only last part of type
    public allowedFileExtensions: Array<String> = Environment.get('fileProvider').allowedFileExtensions; // should be ['png', 'jpg'] <= from '.png', '.jpg': without dot. Also can contain "without extension".

    constructor(environment: Environment) {
        this.environment = environment;
        this._reader = new FileReader();
        this._reader.onload = this._onLoad.bind(this);
    }

    private _fileValidation(file: File): Promise<Boolean> {
        return new Promise((resolve, reject) => {
            // size check
            if (!file.size) {
                throw new Error('Cannot load empty file!');
            }
            if (this.maxFileSize) {
                if (this.maxFileSize < file.size) {
                    throw new Error('File has too big size for load! Its has '
                        + file.size + ' bytes against ' + this.maxFileSize + ' bytes file limit!');
                }
            }
            // types check
            if (this.allowedFileTypes && this.allowedFileTypes.length > 0) {
                let fileType: String = file.type;
                if (!fileType) {
                    throw new Error('File do not has a type!');
                }
                fileType = fileType.split('/')[1];
                if (!fileType) {
                    throw new Error('File has wrong type format!');
                }
                if (fileType && this.allowedFileTypes.indexOf(fileType) < 0) {
                    throw new Error('File has type ' + fileType + ', but its not available for load. Available types are: '
                        + this.allowedFileTypes.join(', ') + '.');
                }
            }
            // name check
            if (!file.name) {
                throw new Error('File do not has a name!');
            }
            // extension check
            if (this.allowedFileExtensions && this.allowedFileExtensions.length > 0) {
                let ext: String = 'without extension';
                if (file.name.indexOf('.') >= 0) {
                    let split = file.name.split('.');
                    ext = split[split.length - 1];
                }
                if (this.allowedFileExtensions.indexOf(ext) < 0) {
                    throw new Error('File with extension ' + ext + ' not allowed! Allowed extensions are: '
                        + this.allowedFileExtensions.join(', ') + '.');
                }
            }
            return resolve(true);
        });
    }

    private _onLoad(event: any) {
        this._loading = false;
        if (event.target && event.target.result) {
            this._payload = event.target.result.split('base64,')[1];
        }
    }

    isLoading(): Boolean {
        return this._loading;
    }

    getPayload(): String {
        return this._payload;
    }

    putFileIn(file: File): Promise<void> {
        if (!this._loading) {
            this._file = file;
            this._payload = null;
            return this._fileValidation(file)
                .then((result: Boolean) => {
                    this._loading = true;
                    this._reader.readAsDataURL(file);
                })
                .catch((error: Error) => {
                    throw error;
                });
        } else {
            throw new Error('Already busy with loading! Cannot load few files in same time!');
        }
    }
}