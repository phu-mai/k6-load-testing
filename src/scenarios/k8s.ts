import { Kubernetes } from 'k6/x/kubernetes';

const k8s = new Kubernetes();

export function createConfigMap( inputYaml: string ) {
  k8s.apply(inputYaml);
}
export function createDeployment( inputYaml: string ) {
  k8s.apply(inputYaml);
}
